class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e)
        })
    }

    handleSubmit(e){
       e.preventDefault()
       const camposValidos = this.camposSaoValidos()
       const senhasValidas = this.senhasSaoValidas()

       if(camposValidos && senhasValidas){
        alert('Formulario enviado')
        this.formulario.submit()
       }
    }

    camposSaoValidos(){
        let valid = true
        
        for(let i of this.formulario.querySelectorAll('.error-text')){
            i.remove()
        }
        
        for(let i of this.formulario.querySelectorAll('.validar')){
            const label = i.previousElementSibling.innerHTML
            
            if(!i.value){
                ValidaFormulario.criaErro(i, `Campo "${label}" não pode estar vazio`)
                valid = false
            }
            
            if(i.classList.contains('cpf')){
                if(!ValidaFormulario.validaCpf(i)) valid = false
            }
            
            if(i.classList.contains('usuario')){
                if(!ValidaFormulario.validaUsuario(i)) valid = false
            }
        }
        
        return valid
    }

    senhasSaoValidas(){
        let valid = true

        const senha = this.formulario.querySelector('.senha')
        const repetirSenha = this.formulario.querySelector('.repetir-senha')

        if(senha.value !== repetirSenha.value){
            ValidaFormulario.criaErro(senha, 'As senhas precisam ser iguais')
            ValidaFormulario.criaErro(repetirSenha, 'As senhas precisam ser iguais')
            valid = false
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            ValidaFormulario.criaErro(senha, 'Senha deve ter entre 6 e 12 caracteres')
            valid = false
        }

        return valid
    }
    
    static validaUsuario(campo){
        const usuario = campo.value
        let valid = true
        if(usuario.length < 3 || usuario.length > 12){
            ValidaFormulario.criaErro(campo, 'Usuario deve ter entre 3 e 12 caracteres')
            valid = false
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            ValidaFormulario.criaErro(campo, 'Usuario deve ter somente letras e/ou numeros')
            valid = false
        }

        return valid
    }

    static validaCpf(campo){
        const cpf = new ValidaCPF(campo.value)

        if(!cpf.valida()){
            ValidaFormulario.criaErro(campo, 'CPF invalido')
            return false
        }
        return true
    }

    static criaErro(campo, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
}

const valida = new ValidaFormulario()