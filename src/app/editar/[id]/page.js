"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"

export default function EditarProducto() {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState({ nombre: "", precio_unitario: "", descripcion: "", imagen_url: "" });

    useEffect(() => {
        async function cargarProducto() {
            const { data } = await supabase.from("productos").select("*").eq("id", id).single();
            if (data) setFormData(data);
        }
        cargarProducto();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from("productos")
            .update(formData)
            .eq("id", id);

        if (!error) {
            toast.success("¡Producto editado correctamente!");
            router.push("/");
            router.refresh();
        }
        else{
            toast.error("Error al crear: " + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Nombre"
                />
                <Input
                    type="number"
                    value={formData.precio_unitario}
                    onChange={(e) => setFormData({ ...formData, precio_unitario: e.target.value })}
                    placeholder="Precio"
                />
                <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancelar
                </Button>
                <Button type="submit">Guardar Cambios</Button>
            </form>
        </div>
    );
}