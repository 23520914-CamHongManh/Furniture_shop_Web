<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TempImage;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    // This method will return all the products
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->with('product_images')->get();
        return response()->json([
            'status' => 200,
            'data' => $products,
        ], 200);
    }

    // This method will store a new product
    public function store(Request $request)
    {
        //Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required', // sanitized and validated after
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required|in:yes,no',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        // sanitize and validate price
        $sanitizedPrice = $this->sanitizeNumeric($request->price);
        if ($sanitizedPrice === null) {
            return response()->json([
                'status' => 400,
                'errors' => ['price' => ['Price must be a valid number']],
            ], 400);
        }

        //Store the product
        $product = new Product();

        $product->title = $request->title;

        // Sanitize numeric inputs that may contain thousand separators (e.g., "2.800.000")
        $product->price = $this->sanitizeNumeric($request->price);
        $product->compare_price = $this->sanitizeNumeric($request->compare_price);

        $product->category_id = $request->category;
        $product->room_type_id = $request->room_type;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->barcode = $request->barcode;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        //Save the product images
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                //Large Thumbnail
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);
                $imageName = 'product_' . $product->id . '_' . time() . '.' . $ext;
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));
                //Small Thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image = $imageName;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product has been  created successfully',
        ], 200);
    }

    // This method will return a single  product
    public function show($id)
    {
        $product = Product::with('product_images')->find($id);

        if ($product === null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $product,
        ], 200);
    }

    // This method will update a product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if ($product === null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }
        //Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required', // sanitized and validated after
            'category' => 'required|integer',
            'sku' => [
                'required',
                Rule::unique('products', 'sku')->ignore($id, 'id'),
            ],
            'is_featured' => 'required|in:yes,no',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        // sanitize and validate price
        $sanitizedPrice = $this->sanitizeNumeric($request->price);
        if ($sanitizedPrice === null) {
            return response()->json([
                'status' => 400,
                'errors' => ['price' => ['Price must be a valid number']],
            ], 400);
        }

        //Update the product
        $product->title = $request->title;

        // Sanitize numeric inputs
        $product->price = $this->sanitizeNumeric($request->price);
        $product->compare_price = $this->sanitizeNumeric($request->compare_price);

        $product->category_id = $request->category;
        $product->room_type_id = $request->room_type;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->barcode = $request->barcode;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product has been  updated successfully',
        ], 200);
    }

    // This method will delete a product
    public function destroy($id)
    {
        $product = Product::with('product_images')->find($id);

        if ($product === null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }
        $product->delete();

        if($product->product_images){
            foreach($product->product_images() as $productImage){
                File::delete(public_path('uploads/products/large/'.$productImage->image));
                File::delete(public_path('uploads/products/small/'.$productImage->image));
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product has been deleted successfully'
        ]);
    }

    // This method will save product images
    public function saveProductImages(Request $request)
    {
        //Validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        //Store the image
        
        $image = $request->file('image');
        $imageName = $request->product_id.'-'.time() . '.' . $image->extension(); 


        //Large Thumbnail

        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathName());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));
        
        //Small Thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathName());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        //Insert a record in product_images table
        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

        return  response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully',
            'data' => $productImage
        ], 200);
    }

    public function updateProductImages(Request $request)
    {
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product default image changed successfully',
        ], 200);
    }

    public function deleteProductImage($id){
        $productImage = ProductImage::find($id);
        if($productImage == null){
            return response()->json([
                'status' => 404,
                'message' => 'Image not found',
        ], 400); 
        }

        File::delete(public_path('uploads/products/large/'.$productImage->image));
        File::delete(public_path('uploads/products/small/'.$productImage->image));

        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product image deleted successfully',
        ], 200);
    }

    /**
     * Sanitize numeric inputs that may have thousand separators or localized formats.
     * Examples: "2.800.000" => 2800000, "1,234.56" => 1234.56
     */
    protected function sanitizeNumeric($value)
    {
        if ($value === null || $value === '') {
            return null;
        }

        // Remove white space
        $v = preg_replace('/\s+/', '', (string) $value);

        // If the value uses dot as thousand separator (e.g., "2.800.000"), remove dots
        // Then convert comma decimal separators to dot
        $v = str_replace('.', '', $v);
        $v = str_replace(',', '.', $v);

        // Strip any remaining non-digit except '.' and '-'
        $v = preg_replace('/[^0-9\.\-]/', '', $v);

        return is_numeric($v) ? (float) $v : null;
    }
        
}
