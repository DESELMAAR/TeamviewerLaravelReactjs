<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        try{ 
          
                return OrderResource::collection(Order::query()->orderBy('id','desc')->paginate(10));

  

        }catch(Exception $e){
           return response([
            "error"=>$e,
            "msg"=>"oops! something was wrong..."
           ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    
    public function store(StoreOrderRequest $request)
    {
      try{
        $data=$request->validated();

        $order=Order::create($data);
        $order->services()->attach($request->validated('Service'));

        if($order){
            return response(new OrderResource($order),201);
        
        }
      }catch(Exception $e){
         return response([
            "error"=>$e,
            "msg"=>"oops! something was wrong..."

         ]);
      }
       
       

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        $data=$request->validated();
        $order->update($data);    
    return response(new OrderResource($order));
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
    //    dd( Gate::allows('delete_modify',$order));
        if(!Gate::allows('delete_modify',$order)){
            return response([
                "msg"=>"You are not allowed to delete this order,Ask owner",
                "status"=>403
            ]);

            // abort(403,"not allowed");
        }else{
            $order->delete();
            return response("",204);
        };
      
        
    }
}
