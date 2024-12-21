<?php

namespace App\Providers;

use App\Http\Resources\ServiceResource;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
        ServiceResource::withoutWrapping();
        // gate for who delete an order delete
        Gate::define('delete_modify', function(User $user,Order $order){
              return $order->agent_id == $user->id ;
        });

        // gate for who could create a team
        Gate::define('admin_ability', function(User $user){

            return $user->IsAdmin ;
      });

      Gate::define('orders_users', function(User $user , Order $order){
            // dd( $order=Order::all()->where('agent_id','=',$user->id));
            $order=Order::all()->where('agent_id','=',$user->id);
        return  ($order);
  });

    }

}
