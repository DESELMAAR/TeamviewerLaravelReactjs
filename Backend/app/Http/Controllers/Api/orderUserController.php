<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class orderUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( )
    {
        // dd($id);
        
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order,string $id)
    {
        // dd($order);
        $user=User::find($id);

        // dd($user);
        try{ 
       if( Gate::allows('orders_users',$order,$user)){
        return OrderResource::collection(Order::query()->where('agent_id','=',$id)->orderBy('id','desc')->paginate(10));

       }



    }catch(Exception $e){
       return response([
        "error"=>$e,
        "msg"=>"oops! something was wrong..."
       ]);
    }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
