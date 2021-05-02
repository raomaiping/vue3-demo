//@login & register
const express = require("express");
const router = express.Router();

//引入User数据模型
const Profile = require("../../models/Profile");


// $route  GET  api/profiles/test
// @desc   返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "profiles works"
    })
});


// $route  POST  api/profiles/add
// @desc   创建信息接口
// @access Private
router.post("/add", (req, res) => {
    const profileFields = {};
    console.log(req.body);
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.link) profileFields.link = req.body.link;
    console.log(profileFields);
    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })
});


// $route  GET  api/profiles
// @desc   获取所有信息
// @access Private

router.get("/", (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));

});


// $route  GET  api/profiles/:id
// @desc   获取单个信息
// @access Private

router.get("/:id", (req, res) => {
    Profile.findOne({
        _id: req.params.id
    })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));

});

// $route  GET  api/profiles/:title
// @desc   根据title模糊查询
// @access Private

router.get("/search/:title", (req, res) => {
    Profile.find({ title: new RegExp(req.params.title) })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容");
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));

});


// $route  POST  api/profiles/edit
// @desc   编辑信息接口
// @access Private
router.post("/edit/:id", (req, res) => {
    const profileFields = {};

    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.link) profileFields.link = req.body.link;

    Profile.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: profileFields
    }, {
        new: true
    }).then(profile => res.json(profile)).catch(err => res.status(422).json("Item doesnt exits"))
});

//根据id删除信息
router.delete('/delete/:id', (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(404).json('删除失败'));
});

//删除所有信息
router.delete('/deleteAll', (req, res) => {
    Profile.remove({})
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(404).json('删除失败'));
});



module.exports = router;