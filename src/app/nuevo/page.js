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
            precio_unitario: parseFloat(precio) 
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
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
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
          </CardContent>
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