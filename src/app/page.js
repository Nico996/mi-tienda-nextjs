"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que desea eliminar este producto?")) return;

    const { error } = await supabase
      .from("productos")
      .delete()
      .eq("id", id); // Filtra por el ID del producto

    if (error) {
      alert("Error al eliminar");
    } else {
      // Actualiza el estado local para que desaparezca de la vista
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  useEffect(() => {
    async function getProductos() {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setProductos(data);
      setLoading(false);
    }
    getProductos();
  }, []);

  if (loading) return <div className="p-10 text-center">Cargando catálogo...</div>;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Hola, soy una página web</h1>
        <Badge variant="outline">{productos.length} Productos</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          productos.map((producto) => (
            <Card key={producto.id} className="overflow-hidden border-none bg-zinc-50 dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                {
                  producto.imagen_url ?
                    (
                      <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    ) :
                    (
                      <div className="flex items-center justify-center h-full text-zinc-400">
                        Sin imagen
                      </div>
                    )
                }
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{producto.descripcion}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="text-xl font-bold">${producto.precio_unitario}</span>
                <Button size="sm">Añadir</Button>
                <div className="flex gap-2">
                  <Link href={`/editar/${producto.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="icon" onClick={() => eliminarProducto(producto.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        }
      </div>

      {
        productos.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <p className="text-muted-foreground">No hay productos disponibles aún.</p>
          </div>
        )
      }
    </main>
  );
}