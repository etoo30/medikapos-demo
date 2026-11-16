import Dexie, { type Table } from 'dexie';

export type Tracking = 'QUANTITY'|'BATCH'|'SERIAL';
export type Product = {id:string;sku:string;barcode:string;name:string;categoryId:string;brandId:string;unit:string;tracking:Tracking;cost:number;price:number;minimum:number;manufacturer:string;description:string;active:boolean;createdAt:string};
export type Category = {id:string;name:string;active:boolean};
export type Brand = {id:string;name:string;active:boolean};
export type Supplier = {id:string;name:string;phone:string;company:string;address:string;active:boolean};
export type Customer = {id:string;name:string;type:string;phone:string;institution:string};
export type Balance = {id:string;productId:string;quantity:number;location:string};
export type Batch = {id:string;productId:string;batchNumber:string;lotNumber:string;quantityReceived:number;remaining:number;expiry:string;cost:number;supplierId:string;status:'ACTIVE'|'QUARANTINED'|'RECALLED'|'DEPLETED';location:string};
export type SerialUnit = {id:string;productId:string;serial:string;cost:number;status:'AVAILABLE'|'SOLD'|'IN_REPAIR'|'QUARANTINED';warrantyMonths:number;warrantyEnd?:string;customer?:string};
export type SaleItem = {productId:string;name:string;sku:string;qty:number;price:number;cost:number;batchAllocations?:{batchId:string;qty:number}[];serialIds?:string[]};
export type Sale = {id:string;number:string;date:string;customer:string;payment:string;subtotal:number;discount:number;total:number;paid:number;change:number;items:SaleItem[];status:'COMPLETED'|'VOID';cashier:string};
export type Purchase = {id:string;number:string;date:string;supplierId:string;supplier:string;total:number;items:{productId:string;name:string;quantity:number;cost:number;tracking:Tracking;batch?:string;lot?:string;expiry?:string;serials?:string[]}[]};
export type Movement = {id:string;productId:string;type:string;quantity:number;before:number;after:number;reference:string;reason:string;date:string;batchId?:string};

class MedikaDB extends Dexie {
 categories!:Table<Category,string>;brands!:Table<Brand,string>;products!:Table<Product,string>;suppliers!:Table<Supplier,string>;customers!:Table<Customer,string>;balances!:Table<Balance,string>;batches!:Table<Batch,string>;serials!:Table<SerialUnit,string>;sales!:Table<Sale,string>;purchases!:Table<Purchase,string>;movements!:Table<Movement,string>;settings!:Table<{id:string;value:any},string>;
 constructor(){super('MedikaPOSDatabase');this.version(1).stores({categories:'id,&name,active',brands:'id,&name,active',products:'id,&sku,&barcode,name,categoryId,brandId,tracking,active',suppliers:'id,name,active',customers:'id,name,type',balances:'id,&productId,location',batches:'id,productId,batchNumber,lotNumber,expiry,status',serials:'id,productId,&serial,status',sales:'id,&number,date,status,customer',purchases:'id,&number,date,supplierId',movements:'id,productId,type,date,reference,batchId',settings:'id'});}
}
export const db=new MedikaDB();
export const rupiah=(n:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Math.round(n));
export const uuid=()=>crypto.randomUUID();
