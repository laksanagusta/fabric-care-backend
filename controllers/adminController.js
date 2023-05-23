const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Service = require("../models/Service");
const bycrypt = require("bcryptjs");
const { serviceService, spendingService, branchService, rackService, transactionService } = require("../services");
const { transactionHelper } = require("../helper");
const Flow = require("../models/Flow");


module.exports = {
    viewDashboard: async (req, res) => {
        try {
            const yearlyRevenueData =  await transactionService.getRevenueYearly()
            const years = transactionHelper.generateArrayOfYears()
            res.render('admin/dashboard/v_dashboard', {
                title: "Antardixa",
                user: req.session.user,
                yearlyRevenueData,
                years
            });            
        } catch (error) {
            
        }
    },
    viewTransaction: async (req, res) => {
        try {
            const transaction = await Transaction.find();
            const service = await serviceService.getAllService();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/transaction/v_transaction', { 
                transaction,
                alert,
                title: "Antardixa",
                action: "view",
                service,
                user: req.session.user
            });
        } catch (error) {
            res.redirect('/admin/transaction');
            
        }
    },
    viewService: async (req, res) => {
        try {
            const service = await Service.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/service/v_service', { 
                service,
                alert,
                title: "Antardixa",
                user: req.session.user
            });
        } catch (error) {
            res.redirect('/admin/service');
        }
    },
    viewSpending: async (req, res) => {
        try {
            const spending = await spendingService.getAllSpending();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/spending/v_spending', { 
                spending,
                alert,
                title: "Antardixa",
                user: req.session.user
            });
        } catch (error) {
            res.redirect('/admin/spending');
        }
    },
    viewBranch: async (req, res) => {
        try {
            const branch = await branchService.getAllBranch();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/branch/v_branch', { 
                branch,
                alert,
                title: "Antardixa",
                user: req.session.user
            });
        } catch (error) {
            res.redirect('/admin/branch');
        }
    },
    viewRack: async (req, res) => {
        try {
            const rack = await rackService.getAllRack();
            console.log("sdwadwada");
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/rack/v_rack', { 
                rack,
                alert,
                title: "Antardixa",
                user: req.session.user
            });
        } catch (error) {
            res.redirect('/admin/rack');
        }
    },
    viewUser: async (req, res) => {
        try {
            const user = await User.findOne({_id:req.session.user.id}) 
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/user/v_user', {
                title: "Antardixa",
                user,
                alert,
            });
        } catch (error) {
            
        }
    },
    viewFlow: async (req, res) => {
        try {
            const flow = await Flow.find() 
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('admin/flow/v_flow', {
                title: "Antardixa",
                flow,
                alert,
                user: req.session.user
            });
        } catch (error) {
            throw new Error(error)
        }
    },
    viewSignIn: async (req, res) => {
        try {
            if(req.session.user == null || req.session.user == undefined)
            {
                const alertMessage = req.flash('alertMessage');
                const alertStatus = req.flash('alertStatus');
                const alert = {message: alertMessage, status : alertStatus};
                res.render('index', {
                    alert,
                    title: "Antardixa",
                    user: req.session.user
                });
            }else{
                res.redirect('/admin/dashboard')
            }
        } catch (error) {
            res.redirect('/admin/signin');
            
        }
    },
    viewSignUp: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status : alertStatus};
            res.render('signup', {
                alert,
                title: "Antardixa",
                user: req.session.user
            });
        } catch (error) {
            res.redirect('/admin/signup');
        }
    },
    signIn: async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username:username})
            const isPasswordMatch = await bycrypt.compare(password, user.password);

            if(user){
                if(isPasswordMatch)
                {
                    req.session.user = {
                        id:user.id,
                        name:user.name,
                        username:user.username
                    }
                    res.redirect('/admin/dashboard');
                }
                else{
                    req.flash('alertMessage', 'Password dosesnt match');
                    req.flash('alertStatus', 'danger');
                    res.redirect('/admin/signin');
                }
            }
            else{
                req.flash('alertMessage', 'Username not found in any records');
                req.flash('alertStatus', 'danger');
                res.redirect('/admin/signin');
            }            
        } catch (error) {
            req.flash('alertMessage', 'Username not found in any records');
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/signin');
        }
    },
    signUp: async (req, res) => {
        try {
            const {username, password, name} = req.body;
            const user = await User.create({
                name: name,
                username: username,
                password: password
            })
            user.save()
            req.session.user = {
                id:user.id,
                name:user.name,
                username:user.username
            }
            res.redirect('/admin/dashboard');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/signup');
        }
    },
    logout: async(req, res) => {
        req.session.destroy();
        res.redirect('/admin/signin')
    }
}