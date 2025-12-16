<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class frontOderController extends Controller
{
    public function saveOrder(Request $request)
    {
        if(!empty())
        {
        $order = new Order();
        $order->name=$request->name;
        $order->email=$request->email;
        $order->zip=$request->zip;
        $order->city=$request->city;
        $order->address=$request->address;
        $order->mobile=$request->mobile;
        $order->state=$request->state;
        $order->grand_total=$request->grand_total;
        $order->sub_total=$request->sub_total;
        $order->shipping=$request->shipping;
        $order->payment_status=$request->payment_status;
        $order->status=$request->status;
        $order->user_id=$request->user()->id();
        $order->save();

        foreach($request->cart as $item){
        $oderItem = new OrderItem();
        $oderItem->order_id = $order->id;
        $oderItem->price = $item['qty'] * $item['price'];
        $oderItem->unit_price = $item['price'];
        $oderItem->qty = $item['qty'];
        $oderItem->product_id = $item['product_id'];
        $oderItem->size = $item['size'];
        $oderItem->name = $item['title'];
        $oderItem->save();
        }   
        return response()->json([
        'status' => 200,
        'message' => 'You have succesfully placed yout order.'
        ],200); 
        }else {
        return response()->json([
        'status' => 400,
        'id' => $order->id,
        'message' => 'Your cart is empty.'
        ], 400);
        }
    }
}
