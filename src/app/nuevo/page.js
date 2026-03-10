"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function NuevoProducto() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenUrl, setImagenUrl] = useState("");

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from("productos")
            .insert([
                {
                    nombre: nombre,
                    precio_unitario: parseFloat(precio),
                    descripcion: descripcion,
                    imagen_url: imagenUrl
                }
            ]);

        if (error) {
            alert("Error al crear: " + error.message);
        } else {
            router.push("/"); // Nos devuelve a la lista
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center py-10">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle>Agregar Nuevo Producto</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nombre del Producto</label>
                            <Input
                                placeholder="Ej. Silla Ergonómica"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Precio ($)</label>
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="29000.99"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Descripción</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Describa el producto (opcional)"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL de la Imagen</label>
                            <Input
                                placeholder="https://ejemplo.com/imagen.jpg (opcional)"
                                value={imagenUrl}
                                onChange={(e) => setImagenUrl(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <br/>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar Producto"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}