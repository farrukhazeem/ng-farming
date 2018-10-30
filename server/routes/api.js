const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
const User = require('../models/user');
const Region = require('../models/district');
const Bug = require('../models/bug');

const Grower = require('../models/grower');
const Product = require('../models/product');
const Field = require('../models/field');
const Invites = require('../models/invites');
const InvitesDetails = require('../models/inviteDetails');

const CreateSupervisor = require('../models/supervisorUser');
const Reports = require('../models/reports');
const ReportsDetails = require('../models/reportsDetails');

const Contract = require('../models/contract');


// Development
mongoose.connect('mongodb://taimoortariq:123456q@ds018168.mlab.com:18168/ng6-auth').then((data) => {
    console.log("Connection Establish MongoDb")
}).catch((err) => {
    console.log(err)
})

// Production
// mongoose.connect('mongodb://taim:123123a@ds247171.mlab.com:47171/poly').then((data) => {
//     console.log("Connection Establish MongoDb")
// }).catch((err) => {
//     console.log(err)
// })



// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users/:user_id', (req, res) => {

    User.find({ creater_id: req.params.user_id })

        .then((users) => {
            response.data = users;
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});



router.get('/get-k-supervisor/:email', (req, res) => {

    CreateSupervisor.find({ name: req.params.email })

        .then((users) => {
            response.data = users;
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});

router.get('/get-user-supervisorForSupervisor', (req, res) => {

    CreateSupervisor.find({})

        .then((users) => {
            response.data = users;
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});

router.get('/get-supervisor-by-regionId/:id', (req, res) => {

    CreateSupervisor.find({ district: req.params.id })

        .then((users) => {
            response.data = users;
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});



router.get('/get-user-supervisor/:user_id/:userType', (req, res) => {

    console.log(req.params.user_id);
    console.log(req.params.userType);

    CreateSupervisor.find({ creater_id: req.params.user_id, userType: req.params.userType })

        .then((users) => {
            response.data = users;
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});



router.get('/get-user-by-region-and-user-type/:region_id/:userType', (req, res) => {

    console.log(req.params.region_id);
    console.log(req.params.userType);

    CreateSupervisor.find({ district: req.params.region_id, userType: req.params.userType })

        .then((users) => {
            response.data = users;
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});






router.get('/get-user-supervisor-by-supersupervisor/:id', (req, res) => {

    console.log(req.params.id);


    CreateSupervisor.find({ creater_id: req.params.id })

        .then((users) => {
            response.data = users;
            console.log(users)
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});


router.get('/get-user-data/:id', (req, res) => {

    console.log(req.params.id);
    CreateSupervisor.find({ user_id: req.params.id })

        .then((users) => {
            response.data = users;
            console.log(users)
            return res.status(200).send({ users })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});



router.post('/create-user', (req, res) => {

    var body = req.body;
    var newUser = new User(body);
    newUser.save().then((data) => {
        return res.status(200).send({ data })

    }).catch((e) => {
        return res.status(500).send({ e })

    })

});


router.post('/edit-user', (req, res) => {

    User.findOne({ user_id: req.body.user_id }, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {


            data.email = req.body.email;
            data.First_Name = req.body.First_Name;
            data.Last_Name = req.body.Last_Name;
            data.Phone_Number = req.body.Phone_Number;
            data.user_eskolnumber = req.body.user_eskolnumber;
            data.country_id = req.body.country_id;


            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });


});



router.post('/create-user-supervisor', (req, res) => {

    var body = req.body;
    var newUserSupervisor = new CreateSupervisor(body);
    newUserSupervisor.save().then((data) => {
        return res.status(200).send({ data })

    }).catch((e) => {
        return res.status(500).send({ e })

    })

});


router.post('/edit-user-supervisor', (req, res) => {
    console.log("edit-user-supervisor");

    CreateSupervisor.findOne({ user_id: req.body.user_id }, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {


            data.firstName = req.body.firstName;
            data.lastName = req.body.lastName;
            data.district = req.body.district;
            data.email = req.body.email;
            data.mobile = req.body.mobile;
            data.eshkol_number = req.body.eshkol_number;
            data.country_id = req.body.country_id;


            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });

})



//Region

router.post('/add-region', (req, res) => {

    var body = req.body;
    var region = new Region(body);
    region.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.get('/get-region', (req, res) => {


    Region.find({})

        .then((data) => {
            response.data = data;
            console.warn('getting district data::', data)
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});


router.post('/edit-region', (req, res) => {

    Region.findById(req.body.id, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {
            data.region_name = req.body.region_name;
            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });
})


router.post('/add-bug', (req, res) => {

    var body = req.body;
    var bug = new Bug(body);
    bug.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



router.get('/get-bug', (req, res) => {

    Bug.find({})

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });
});


router.post('/edit-bug', (req, res) => {
console.log(req.body);
    Bug.findById(req.body.id, (err, data) => {
        if (!data)
            return res.status(500).send({ err })

        else { 
            data.bug_name = req.body.bug_name;
            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });
})


router.post('/add-grower', (req, res) => {

    var body = req.body;
    var grower = new Grower(body);
    grower.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



//Reports
router.get('/get-reports', (req, res) => {


    Reports.find({})

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});


//Reports
router.get('/get-reports-by-growerId/:id', (req, res) => {


    Reports.find({ grower_id: req.params.id })

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});



router.post('/add-reports', (req, res) => {

    var body = req.body;
    var reports = new Reports(body);
    reports.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});

router.get('/get-reports-details', (req, res) => {


    ReportsDetails.find({})

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});


router.get('/get-reports-details-by-report-id/:id', (req, res) => {


    ReportsDetails.find({report_id: req.params.id})

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});




router.delete('/delete-reports-details/:id', (req, res) => {

    ReportsDetails.findByIdAndRemove(req.params.id).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});

router.delete('/delete-complete-report/:id', (req, res) => {

    Reports.findByIdAndRemove(req.params.id).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



router.get('/get-details-by-id/:id', (req, res) => {


    Reports.find({ grower_id: req.params.id })

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});

router.post('/add-reports-details', (req, res) => {

    var body = req.body;
    var reports = new ReportsDetails(body);
    reports.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});

router.get('/get-grower', (req, res) => {


    Grower.find({}).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.get('/get-grower-by-creator/:id', (req, res) => {


    Grower.find({ supervisor_id: req.params.id }).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.get('/get-grower-by-regionId/:id', (req, res) => {


    Grower.find({ region_id: req.params.id }).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



router.post('/edit-grower', (req, res) => {
    console.log("Edit");

    Grower.findById(req.body.id, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {
            console.log(data);

            data.first_name = req.body.first_name,
                data.last_name = req.body.last_name,
                data.cell_phone = req.body.cell_phone,
                data.email = req.body.email,
                data.zip_code = req.body.zip_code,
                data.office_phone = req.body.office_phone,
                data.farm_name = req.body.farm_name,
                data.address = req.body.address,
                data.eshkol_number = req.body.eshkol_number,
                data.region_id = req.body.region_id,
                data.supervisor_id = req.body.supervisor_id,


                console.log(data);

            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });
})


router.post('/add-product', (req, res) => {

    var body = req.body;
    var product = new Product(body);
    product.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});




router.get('/get-product', (req, res) => {

    Product.find({}).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});

router.get('/get-product-byId/:id', (req, res) => {
    
    
    Product.find({_id: req.params.id }).then((data) => {
            return res.status(200).send({ data })
        }).catch((e) => {
            return res.status(500).send({ e })
        })
    
    })

router.post('/edit-product', (req, res) => {

    Product.findById(req.body.id, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {
            console.log("inner");
            console.log(data);
            console.log(req.body);

            data.product_name = req.body.product_name;
            data.product_quantity_bottle = req.body.product_quantity_bottle;
            data.product_sku = req.body.product_sku;

            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });
})



router.post('/add-invites', (req, res) => {

    var body = req.body;
    var invites = new Invites(body);
    invites.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.get('/get-invites', (req, res) => {

    Invites.find({}).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


// router.get('/get-invites-by-id/:id', (req, res) => {
//     console.log(req.params.id);
//     Invites.find({grower_id: req.params.id}).then((data) => {
//         return res.status(200).send({ data })
//     }).catch((e) => {
//         return res.status(500).send({ e })
//     })
// });



router.get('/get-invites-by-id/:id', (req, res) => {
    console.log(req.params.id);

    Invites.find({ grower_id: req.params.id })

        .then((data) => {
            response.data = data;
            return res.status(200).send({ data })
        })
        .catch((err) => {
            return res.status(500).send({ err })
        });

});



//Invite Details
router.post('/add-invites-details', (req, res) => {

    var body = req.body;
    var invitesDetails = new InvitesDetails(body);
    invitesDetails.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.get('/get-invites-details', (req, res) => {

    InvitesDetails.find({}).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



router.get('/get-invites-details-by-inviteid/:id', (req, res) => {
    InvitesDetails.find({ invite_id: req.params.id }).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })
});

router.delete('/delete-invites-details/:id', (req, res) => {

    InvitesDetails.findByIdAndRemove(req.params.id).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.delete('/delete-complete-invite/:id', (req, res) => {

    Invites.findByIdAndRemove(req.params.id).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});




router.post('/add-field', (req, res) => {

    var body = req.body;
    var fields = new Field(body);
    fields.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.get('/get-field', (req, res) => {

    Field.find({}).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



router.get('/get-field-by-growerid/:id', (req, res) => {

    Field.find({ grower_id: req.params.id }).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



router.post('/edit-field', (req, res) => {

    Field.findById(req.body.id, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {
            console.log("inner");
            console.log(data);
            console.log(req.body);

            data.field_name = req.body.field_name;
            data.field_size = req.body.field_size;
            data.seeding_date = req.body.seeding_date;
            data.seeding_week = req.body.seeding_week;
            data.grower_id = req.body.grower_id;
            data.city = req.body.city;
            data.eshkol_number = req.body.eshkol_number;
            


            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });

});



router.post('/add-contract', (req, res) => {

    var body = req.body;
    var contract = new Contract(body);
    contract.save().then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});

router.get('/get-contract', (req, res) => {

    Contract.find({}).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});


router.post('/edit-contract', (req, res) => {

    Contract.findById(req.body.id, (err, data) => {
        if (!data)
            return res.status(500).send({ err })
        else {
            console.log("inner");
            console.log(data);
            console.log(req.body);

            data.grower_id = req.body.grower_id;
            data.product_id = req.body.product_id;
            data.amount = req.body.amount;
            data.start_date = req.body.start_date;
            data.end_date = req.body.end_date;



            data.save().then((data) => {
                return res.status(200).send({ data })
            }).catch((e) => {
                return res.status(500).send({ e })
            });
        }
    });
});



router.get('/get-contract-by-growerid/:id', (req, res) => {

    Contract.find({ grower_id: req.params.id }).then((data) => {
        return res.status(200).send({ data })
    }).catch((e) => {
        return res.status(500).send({ e })
    })

});



module.exports = router;
