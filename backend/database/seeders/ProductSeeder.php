<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\RoomType;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Create sample categories
        $categories = [];
        $c = new Category(); $c->name = 'Sofa'; $c->save(); $categories[] = $c;
        $c = new Category(); $c->name = 'Table'; $c->save(); $categories[] = $c;
        $c = new Category(); $c->name = 'Chair'; $c->save(); $categories[] = $c;

        // Create sample room types
        $roomTypes = [];
        $r = new RoomType(); $r->name = 'Living Room'; $r->save(); $roomTypes[] = $r;
        $r = new RoomType(); $r->name = 'Bedroom'; $r->save(); $roomTypes[] = $r;

        // Create sample products
        for ($i = 1; $i <= 9; $i++) {
            $p = new Product();
            $p->title = "Sample Product {$i}";
            $p->price = 100000 * $i; // numeric
            $p->compare_price = ($i % 2 == 0) ? 120000 * $i : null;
            $p->category_id = $categories[array_rand($categories)]->id;
            $p->room_type_id = $roomTypes[array_rand($roomTypes)]->id;
            $p->sku = 'SKU' . time() . $i;
            $p->qty = 10 + $i;
            $p->description = 'Seeded sample product';
            $p->short_description = 'Short desc';
            $p->status = 1; // active
            $p->is_featured = 'no';
            $p->save();
        }
    }
}
