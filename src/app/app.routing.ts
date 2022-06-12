import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent, EmailLayoutComponent } from './containers';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'userinfo',
        loadChildren: () =>
          import('./pages/userinfo/userinfo.module').then(
            (m) => m.UserinfoModule
          ),
      },
      { path: 'inbounds',
        loadChildren: () => import('./pages/inbounds/inbounds.module').then(m => m.InboundsModule),
      },
      { path: 'outbounds',
        loadChildren: () => import('./pages/outbounds/outbounds.module').then(m => m.OutboundsModule),
      },
      { path: 'inventory',
        loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule),
      },
      { path: 'orders',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
      },
      { path: 'returns',
        loadChildren: () => import('./pages/returns/returns.module').then(m => m.ReturnsModule),
      },
      { path: 'errors',
        loadChildren: () => import('./pages/errors/errors.module').then(m => m.ErrorsModule),
      },
      { path: 'invoice',
        loadChildren: () => import('./pages/invoice/invoice.module').then(m => m.InvoiceModule),
      },
      { path: 'apps',
        loadChildren: () => import('./pages/apps/apps.module').then(m => m.AppsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
