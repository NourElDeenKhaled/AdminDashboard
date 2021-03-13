import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { SingleOrderComponent } from './components/single-order/single-order.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path: 'Login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'Admin', 
    canActivate: [AdminGuard],
    children: [
      {path: 'Dashboard', component: DashboardComponent},
      {path: 'Categories', component: CategoriesComponent},
      {path: 'Products', component: ProductsComponent},
      {path: 'Products/:PID', component: EditProductComponent},
      {path: 'Customers', component: CustomersComponent},
      {path: 'Orders', component: OrdersComponent},
      {path: 'Orders/:OID', component: SingleOrderComponent},
      {path: 'AddCategory', component: AddCategoryComponent},
      {path: 'AddProduct', component: AddProductComponent},
      {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
    ]
  },
  {path: '', redirectTo: 'Login', pathMatch: 'full'},
  {path: '**', redirectTo: 'Login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
