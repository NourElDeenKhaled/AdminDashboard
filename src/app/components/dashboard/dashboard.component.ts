import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/firebaseServices/Category/categories.service';
import { UsersService } from 'src/app/firebaseServices/User/users.service';
import { OrdersService } from 'src/app/firebaseServices/Order/orders.service';
import { ProductsService } from 'src/app/firebaseServices/Product/products.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    totalPrds: number;
    totalCats: number;
    totalCusts: number;
    totalOrds: number;
    orderList;
    customerList;
    productList;
    categoryList;
    subscription: Subscription[] = [];
    ordsSubTotal: number = 0;
    ordsAvg: number = 0;


    constructor(private prdSrv: ProductsService,
        private orderSrv: OrdersService,
        private customerSrv: UsersService,
        private catSrv: CategoriesService) { }

    ngOnInit(): void {
        var c1 = new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                // 137 - 85
                labels: [
                    "01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan", "08 Jan", "09 Jan", "10 Jan",
                    "11 Jan", "12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan",
                    "21 Jan", "22 Jan", "23 Jan", "24 Jan", "25 Jan", "26 Jan", "27 Jan", "28 Jan", "29 Jan", "30 Jan"
                ],
                datasets: [{
                    data: [
                        130, 135, 100, 106, 107, 111, 133, 88, 93, 120,
                        130, 135, 100, 106, 107, 111, 133, 88, 93, 120,
                        130, 135, 100, 106, 107, 111, 133, 88, 93, 120
                    ],
                    label: "Sales",
                    borderColor: "#9D72FF",
                    backgroundColor: "#523695",
                    fill: false
                }]
            },
            options: {
                elements: {
                    point: {
                        radius: 1.5
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: false
                },
                legend: {
                    display: false
                }
            }
        });

        var c2 = new Chart(document.getElementById("bar-chart2"), {
            type: 'bar',
            data: {
                // 137 - 85
                labels: [
                    "01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan", "08 Jan", "09 Jan", "10 Jan",
                    "11 Jan", "12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan",
                    "21 Jan", "22 Jan", "23 Jan", "24 Jan", "25 Jan", "26 Jan", "27 Jan", "28 Jan", "29 Jan", "30 Jan"
                ],
                datasets: [{
                    data: [
                        1200, 835, 700, 1000, 490, 650, 800, 1300, 1000, 700,
                        1200, 835, 700, 1000, 490, 650, 800, 1300, 1000, 700,
                        1200, 835, 700, 1000, 490, 650, 800, 1300, 1000, 700
                    ],
                    label: "Orders",
                    backgroundColor: "#9D72FF",
                    fill: true
                }]
            },
            options: {
                elements: {
                    point: {
                        radius: 2
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: false
                },
                legend: {
                    display: false
                }
            }
        });

        this.subscription.push(this.customerSrv.getUsers().subscribe(data => {
            this.customerList = data.map(e => {
                return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
            })
            this.totalCusts=this.customerList.length;
        }))
        this.subscription.push(this.orderSrv.getOrders().subscribe(data => {
            this.orderList = data.map(e => {
                return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
            })
            this.totalOrds=this.orderList.length;
            this.calculateTotalOrds(this.orderList);
            this.calculateAvgOrds(this.orderList);
        }))
        this.subscription.push(this.prdSrv.getProducts().subscribe(data => {
            this.productList = data.map(e => {
                return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
            })
            this.totalPrds=this.productList.length;
        }))
        this.subscription.push(this.catSrv.getCategories().subscribe(data => {
            this.categoryList = data.map(e => {
                return { id: e.payload.doc.id, ...(e.payload.doc.data() as {}) };
            })
            this.totalCats=this.categoryList.length;
        }))
    }

    getCustomerNameByID(id: number): string {
        let x = this.customerList?.find(element => element.id == id);
        return `${x?.email}`
    }

    calculateTotalOrds(orders) {
        this.ordsSubTotal = 0;
        orders.forEach(element => {
            this.ordsSubTotal += element.totalPrice;
            console.log('called');
        });
    }
    calculateAvgOrds(orders) {
        let total:any = this.ordsSubTotal;
        this.ordsAvg = total/this.totalOrds;
    }

}

