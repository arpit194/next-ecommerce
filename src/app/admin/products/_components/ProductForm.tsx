"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents || 0
  );
  return (
    <form action={action} className="space-y-0">
      <div className="py-2">
        <Label htmlFor="name">
          Name <span className="text-red-600">*</span>
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ""}
          required
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="py-2">
        <Label htmlFor="priceInCents">
          Price in Cents <span className="text-red-600">*</span>
        </Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          defaultValue={priceInCents}
          onChange={(e) => {
            const element = e.target as HTMLInputElement;
            setPriceInCents(Number(element.value));
          }}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="py-2">
        <Label htmlFor="description">
          Description <span className="text-red-600">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description || ""}
          required
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="py-2">
        <Label htmlFor="file">
          File <span className="text-red-600">*</span>
        </Label>
        <Input type="file" id="file" name="file" required={product == null} />
        {product !== null && (
          <div className="text-muted-foreground">{product?.filePath}</div>
        )}
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="py-2">
        <Label htmlFor="image">
          Image <span className="text-red-600">*</span>
        </Label>
        <Input type="file" id="image" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product.imagePath}
            width={200}
            height={200}
            alt="Product Image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <div className="text-red-600 py-2">* is required</div>
      <SubmitButton />
    </form>
  );
};

export default ProductForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
