'use client'

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSidebar } from "@/lib/AdminSidebarContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { count } from "console";
import AdminTopBar from "@/components/AdminTopBar";
import { CouponTable } from "./coupon-table";
import { mockCoupons } from "@/lib/mock-data";
import { AddCouponForm } from "./add-coupon-form";
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Orders() {

    const [coupons, setCoupons] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        const getData = async () => {
            try {
                const response = await fetch('/api/getDiscountCodes', { cache: 'no-store' });
                const rawData = await response.json();

                setCoupons(rawData);
                setLoaded(true);
                console.log('rawData:', rawData);

            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        getData();
    }, []);

    // https://dashboard.stripe.com/coupons

    const { toggleSidebar } = useSidebar();

    return (

        <>
            {!loaded ?
                <div className="flex-grow flex items-center justify-center h-[60vh]">
                    <div role="status" className="flex flex-col items-center justify-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>
                :
                <main className="flex min-h-screen flex-col">

                    {/* Top Bar */}
                    <AdminTopBar title="Discounts" />

                    <div className="container mx-auto py-6">

                        <div className="w-full mb-4 flex justify-end">
                            <AddCouponForm />
                        </div>

                        <Alert className={`bg-blue-50 border-blue-300 text-blue-600 py-3 px-4 mb-4`}>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center space-x-3 flex-grow min-w-0">
                                    <AlertCircle className="h-4 w-4" color="#2563eb" />
                                    <p className="text-sm font-normal">
                                        If a coupon is no longer needed, it should be deactivated. This will prevent the coupon from being used without deleting it from the system.
                                    </p>
                                </div>
                                {/* <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsVisible(false)}
                                    className="text-gray-400 hover:text-gray-500 flex-shrink-0 ml-3 h-6 w-6"
                                    aria-label="Dismiss"
                                >
                                    <X className="h-4 w-4" />
                                </Button> */}
                            </div>
                        </Alert>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Discount Codes</h2>
                            {coupons.length != 0 ?
                                <CouponTable coupons={coupons} />
                                :
                                <div className="flex items-center justify-center">
                                    <p className="text-gray-500 py-8">No discount codes found</p>
                                </div>
                            }
                        </div>

                    </div>


                </main>
            }
        </>

    );
}
