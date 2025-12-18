<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        return response()->json(['message' => 'Order saved']);
    }

}
