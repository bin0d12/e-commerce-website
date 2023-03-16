import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AuthRoutingGuard } from './auth-guard/auth-routing.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "seller-auth", component: SellerAuthComponent},
  // {path: '**', component: NotFoundComponent},
  {path: "seller-home", component: SellerHomeComponent, canActivate:[AuthRoutingGuard]},
  {path: "seller-add-product", component: SellerAddProductComponent, canActivate: [AuthRoutingGuard]},
  {path: "seller-update-product/:id", component: SellerUpdateProductComponent, canActivate: [AuthRoutingGuard]},
  {path: 'search/:query', component: SearchComponent},
  {path: "details/:productId", component: ProductDetailsComponent},
  {path: 'user-auth', component: UserAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
