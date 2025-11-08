import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductDetailResponse {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    productSizes: {
        id: number;
        size: string;
    }[];
    nameMeaning: string;
    material: string;
    style: string;
    color: string;
    usage: string;
    productImage: {
        productImageUrl: string;
        productImageId: string;
        objectName: string
    }[];
}

export const getProductDetail = async (productId: string) => {
    try {
        const res = await api.get<ProductDetailResponse>(`${API_URL}/product/${productId}`);
        if (res.status == HttpStatusCode.Ok) {
            return res.data;
        }
    } catch (error) {
        toast.error("Lấy chi tiết sản phẩm thất bại");
    }

};
