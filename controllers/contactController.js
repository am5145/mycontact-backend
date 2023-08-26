const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route Get/ api/cpntacts
//@access public
const getContacts = asyncHandler(async(req, res)=>{
    const contacts =  await Contact.find({user_id:req.user.id});
    res.status(200).json( contacts);
});

//@desc create new contacts
//@route POST/ api/cpntacts
//@access public
const createContact = asyncHandler(async(req, res)=>{
    console.log("The request body is :", req.body);
    const{name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc get contacts
//@route GET/ api/cpntacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  });

//@desc update contacts
//@route PUT/ api/cpntacts/:id
//@access public
const updateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc update contacts
//@route DELETE/ api/cpntacts/:id
//@access public
const deleteContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { 
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact, 
};