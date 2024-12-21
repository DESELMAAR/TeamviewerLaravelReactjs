<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use App\Http\Resources\TeamResource;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            return  TeamResource::collection((Team::query()->with('user')->orderBy('id','desc')->paginate(10))) ;

    }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamRequest $request,User $user)
    {
       if(!Gate::allows('admin_ability',$user)){
          return response([
            "msg"=>"Permission denied",
            "status"=>403
          ]);
       }else{
        $data=$request->validated();
        $team=Team::create($data);
        return response([
            "team"=>$team,
            "msg"=>"saved successfully",
            "status"=>201
        ]);
       };
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team,User $user)
    {
        if(!Gate::allows('admin_ability',$user)){
           return response(["msg"=>"permission denied ,admin account required","status"=>403]);
        }else{
            return new TeamResource($team);

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamRequest $request, Team $team,User $user)
    {

        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            $data=$request->validated();
        // dd($data);
        $team->update($data);

        return new TeamResource($team);
     }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team,User $user)
    {
        if(!Gate::allows('admin_ability',$user)){
            return response(["msg"=>"permission denied ,admin account required","status"=>403]);
         }else{
            $team->delete();
            return response("",204);
   }
 
    }
}
