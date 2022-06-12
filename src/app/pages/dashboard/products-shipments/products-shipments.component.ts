import { Component, OnInit } from '@angular/core';
import { recentOrdersData, bestsellersData, stocksData } from './products-shipments.data';

@Component({
  selector: 'app-products-shipments',
  templateUrl: './products-shipments.component.html',
  styleUrls: ['./products-shipments.component.css']
})
export class ProductsShipmentsComponent implements OnInit {
  recentOrders: any[];
  bestsellers: any[];
  stocks: any[];
  constructor() {

  }

  ngOnInit(): void {
    this.recentOrders = recentOrdersData;
    this.bestsellers = bestsellersData;
    this.stocks = stocksData;
  }

  getBadge(status) {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Created':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Receiving':
        return 'info';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  }
}
