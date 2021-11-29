import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error"

export const Profiles = {
    ROOT: {
        codigo: 1,
        nombre: "Root"
    },
    UEN: {
        codigo: 2,
        nombre: "Unidad de negocio"
    },
    PROVEEDOR: {
        codigo: 3,
        nombre: "Proveedor"
    },
    SRESELLER: {
        codigo: 4,
        nombre: "Super reseller"
    },
    RESELLER: {
        codigo: 5,
        nombre: "Reseller"
    }
}


export function ProfilesValues(): number[] {
    return Object.keys(Profiles).map((key: string) => (Profiles as any)[key].codigo)
}
export function ProfilesValid(profile: number) {
    const arrvalues = ProfilesValues()
    const result = arrvalues.findIndex(p => profile == p) != -1
    return result
}
export function ProfilesNextCreate(profile: number): number {
    switch (profile) {
        case Profiles.UEN.codigo:
            return Profiles.PROVEEDOR.codigo
        case Profiles.PROVEEDOR.codigo:
            return Profiles.SRESELLER.codigo
        case Profiles.SRESELLER.codigo:
            return Profiles.RESELLER.codigo
        default:
            const messageError = "Este usuario no tiene permisos de crear"
            throw new ErrorPermissionDenied(messageError);;
    }
}