import { ErrorPermissionDenied } from "../../../shared/errors/permission-denied.error"


export enum UserProfile {
    ROOT = 1,
    UEN = 2,
    PROVEEDOR = 3,
    SRESELLER = 4,
    RESELLER = 5
}

export interface IProfiles {
    [id: string]: {
        nombre: string,
        codigo: UserProfile,
    }
}


export const Profiles: IProfiles = {
    ROOT: {
        codigo: UserProfile.ROOT,
        nombre: "Root"
    },
    UEN: {
        codigo: UserProfile.UEN,
        nombre: "Unidad de negocio"
    },
    PROVEEDOR: {
        codigo: UserProfile.PROVEEDOR,
        nombre: "Proveedor"
    },
    SRESELLER: {
        codigo: UserProfile.SRESELLER,
        nombre: "Super reseller"
    },
    RESELLER: {
        codigo: UserProfile.RESELLER,
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