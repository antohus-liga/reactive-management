import {useDeleteMaterial, useFetchMaterials} from "@/features/materials/hooks.ts";

export default function useMaterials() {
    const get = useFetchMaterials();
    const deleteMaterial = useDeleteMaterial();
    const handleDeleteMaterial = (publicId: string) => (deleteMaterial.mutate(publicId));

    return {
        get,
        handleDeleteMaterial
    }
}