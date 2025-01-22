const { productSubCategory } = require("../models/productSubCategoryModel");
const slugify = require("slugify");

async function handleAddProductSubCategory(req, res){
    try{
        const { name, category } = req.body;
        //Checking of name and category are present in the input.
        switch(true){
            case !name:
                return res.status().json({success: false, message: "Name is required"})
            case !category:
                return res.status().json({success: false, message: "Category is required"})
        }

        //Checking if the sub-category already exists or not.
        const existingSubCategory = await productCategory.findOne({slug: slugify(name)})
        if (existingSubCategory){
            return res.status(200).json({
                success: true,
                message: "Product Sub-category already exists."
            });
        }

        //Getting the category of the sub-category.
        const getProductCategory = await productCategory.findOne({slug:slugify(category).toLowerCase()});

        //Providing the response.
        const subCategory = await productCategory.create({
            name,
            slug: slugify(name),
            category: getProductCategory.id
        })
        return res.status(201).json({success: true, message: "New Category added", category});
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            error,
            message: "Error while adding category."
        });
    }
}

async function handleUpdateProductCategory(req, res){
    try{
        const { name } = req.body
        const { id } = req.params;
        const category = await productCategory.findByIdAndUpdate(_id = id, {name, slug:slugify(name)}, { new: true });
        return res.status(200).json({
            success: true, 
            message: "Category updated successfully", 
            category
        })
    } catch(error){
        return res.status(500).send({
            success: false,
            error,
            message: "Error while updating category."
        });
    }
}

async function handleGetAllProductsCategories(req, res){
    try{
        const allProductCategories = await productCategory.find({});
        return res.status(200).json({
            success: true, 
            message: "All Categories", 
            allProductCategories
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while getting all categories."
        });
    }
}

async function handleGetAProductCategory(req, res){
    try{
        const { id } = req.params;
        const category = await productCategory.findById(_id=id);
        if (!category){ return res.status(404).json({success:false, message: "Could not find the product."})}
        return res.status(200).json({success: true, message: "Item fetched succesfully", category});
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while getting the product category."
        });
    }
}

async function handleDeleteProductCategory(req, res){
    try{
        const { id } = req.params;
        const category = await productCategory.findByIdAndDelete(id);
        return res.status(200).json({
            success: true, 
            message: "Deleted a Category", 
            category
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Error while deleting the product category."
        });
    }
}

module.exports = { handleAddProductCategory, handleUpdateProductCategory, handleGetAllProductsCategories, handleGetAProductCategory, handleDeleteProductCategory }