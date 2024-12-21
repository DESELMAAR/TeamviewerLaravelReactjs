<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Http\Requests\StoreServicesRequest;
use App\Http\Requests\UpdateServicesRequest;
use App\Http\Resources\ServiceResource;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class ServiceController extends Controller
{
    public function index(User $user)

    {
            return  ServiceResource::collection((Services::query()->with('user')->orderBy('id','desc')->paginate(10))) ;

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServicesRequest $request,User $user)
    {
        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            $data=$request->validated();
            $service=Services::create($data);
            return response(new ServiceResource($service),201);
  }
       
    }
    /**
     * Display the specified resource.
     */
    public function show(Services $services,string $id,User $user)
    {
        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            $service=Services::find($id); 
            return new ServiceResource($service);
  }
       
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServicesRequest $request, string $id,User $user)
    {
        
        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            
        $service=Services::find($id);
        $data=$request->validated();
        $service->update($data);
        return new ServiceResource($service);
  }
    }
    public function destroy(string $id,User $user)
    {
        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            $service=Services::find($id);
            $service->delete();
            return response("", 204);
  }
      
    }
}
