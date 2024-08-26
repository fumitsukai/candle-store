"use server"
import { signupSchema, FormState } from "@/lib/types"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signup(state:FormState, formData: FormData):Promise<FormState> {
    const supabase = createClient()

    const result = signupSchema.safeParse(Object.fromEntries(formData.entries()))   

    if(!result.success) {
        return result.error.flatten().fieldErrors
    }

    const data = result.data
  
    const {  error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options : {
            data: {
                firstName: data.firstName,
                lastName:data.lastName
            }
        }
    })
  
    if (error) {
        return {
            message: "Invalid email or password"
        }
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }