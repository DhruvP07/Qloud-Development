const {product} = require("../models/productModel");
const {productCategory} = require("../models/productCategoryModel");
const cloudinary = require('cloudinary').v2;
const slugify = require("slugify");

async function handleAddProduct(req, res){
    try{
        const { name, description, price, category, quantity } = req.body

        //Checking if the already exists or not.
        const findSlug = await product.find({slug:slugify(name)});
        if(findSlug.length > 0){
            return res.status(200).json({success:true, message: "Product already exists"})
        }

        //Getting Product Category
        const productCategory = await productCategory.findOne({slug:slugify(category).toLowerCase()});

        //uploading Images to cloudinary and generating URLs
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];

        const images = [image1, image2].filter((item)=> item !== undefined);

        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url;
            })
        );
        
        //Creating a new record.
        const newProduct = await product.create({
            name, 
            slug: slugify(name),
            description,
            price,
            category: productCategoryId.id,
            quantity,
            images: imageUrl
        });
        
        //Generating a new response.
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            newProduct
        })
    } catch(error){
        res.status(500).send({
            success: false,
            error,
            message: "Error while adding the product."
        });
    }
}

module.exports = { handleAddProduct }