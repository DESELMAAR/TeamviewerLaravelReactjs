<?php
namespace App\Http\Controllers;
use App\Http\Requests\requestLogin;
use App\Http\Requests\requestRegister;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(requestRegister $request){
        $data = $request->validated();
        
         $user =User::create([
        "name"=>$data['name'],
        "email"=>$data['email'],
        "password"=>Hash::make($data['password']) ,
        // "image_name"=>$filename,
      ]);
    //   Storage::disk('public')->put($image, file_get_contents($request->image));
      if($user){
        $result="saved";
      }else{
        $result = "not saved";
      }
      $token= $user->createToken("mytoken")->plainTextToken;
        return (
            response([
                "message"=>"register",
                "user"=>$user,
                "result"=>$result,
                "token"=>$token
            ])
        );
    }
    public function login(requestLogin $request){
        // header("Access-Control-Allow-Origin: http://localhost:5173");
        // header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        // header("Access-Control-Allow-Headers: Content-Type, Authorization");
        $data=$request->validated();
         if(!Auth::attempt($data)){
            return response([
                "msg"=>"login or password not correct ",
                "status_code"=>433,
            ]);
         }else{
            $user = Auth::user();
            $token= $user->createToken("mytoken")->plainTextToken;
            return response([
                "msg"=>"welcome , you are connected",
                "user"=>Auth()->user(),
                "status"=>"ok",
                "token"=>$token
            ]);
         }
    }
    /**
     * Display the specified resource.
     */
    public function user()
    {
        $user=Auth()->user();
        return response([
            "user"=>$user,
            "msg"=>"user data"
        ]);
    }
    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response([
            "msg"=>"logged out success",
            "status_code"=>205
        ]);
    }
}
