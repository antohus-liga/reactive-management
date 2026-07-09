import {useFetchMaterials} from "@/features/materials/hooks.ts";

export default function MaterialSelect({value, onChange}: {
    value: string,
    onChange: (value: string) => void,
}) {
    const getMaterials = useFetchMaterials();

    return (
        <select value={value}
                onChange={(e) => onChange(e.target.value)}
                className={"p-2 rounded-lg ring-1 text-xl"}
                required={true}
        >
            <option value="" disabled>
                Select material
            </option>

            {getMaterials.data?.map((material) => (
                <option key={material.publicId} value={material.publicId}>
                    {material.description}
                </option>
            ))}
        </select>
    );
}
