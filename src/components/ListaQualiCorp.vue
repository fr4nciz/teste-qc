
<template>
  <main>


    <section class="spinner" v-if="spinner">
      <span class="pissa"></span>
    </section>


    <div class="container">
      <div class="row">
        <div class="col-lg-10 mx-auto mb-4">
          <div class="section-title text-center ">
                    <img src="@/assets/logo.png" class="img-fluid mt-3 mb-3" />

            <h3 class="top-c-sep">Teste Qualicorp</h3>
         
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 mx-auto">
          <div class="career-search mb-60">

            <form action="#" class="career-form mb-60">
              <div class="row">
                <div class="col-md-6 col-lg-4 my-3">
                  <div class="input-group position-relative select-container">
                  
                    <select name="uf" id="uf" @change="getCity($event)" class="custom-select">
                      <option value="default" disabled selected>Seu Estado</option>
                      <option v-for="(data, index) in state" :key="index" :value="data.sigla">{{data.sigla}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4 my-3">
                <div class="select-container">
                  <select name="city" id="city" @change="getCareer($event)" class="custom-select">
                    <option value="default" disabled selected>Sua Cidade</option>
                    <option v-for="(data, index) in data_city" :key="index" :value="data.nome">{{data.nome}}</option>
                  </select>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4 my-3">
                    <div class="select-container">
                  <select name="career" id="career" @change="getEntity($event)" class="custom-select">
                    <option value="default" disabled selected>Sua Profissão</option>
                    <option v-for="(data, index) in data_profission" :key="index" :value="data.profissao">{{data.profissao}}
                    </option>
                  </select>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4 my-3">
                    <div class="select-container">
                  <select name="entity" id="entity" @change="valueEntity($event)" class="custom-select">
                    <option value="default" disabled selected>Sua Entidade</option>
                    <option v-for="(entity, index) in data_entity" :key="index" :value="entity.NomeFantasia">
                      {{entity.NomeFantasia}} - {{entity.RazaoSocial}}</option>
                  </select>
                  </div>
                </div>

                <div class="col-md-6 col-lg-4 my-3">
      
                   <input type="date" class="custom-select" id="date" v-model="birth" />


                </div>
                <div class="col-md-6 col-lg-4 my-3">
                  <button type="button" class="btn btn-lg btn-block btn-light btn-custom" id="contact-submit"
                    @click.prevent="listPlans">
                    Buscar
                  </button>


                </div>
                
               <div class="alert alert-danger" role="alert" v-if="error">
                <span>{{error_all}}</span> 
                <span>{{error_ent}}</span> 
                <span>{{error_ibge}}</span> 
                <span>{{error_prof}}</span> 
                <span>{{error_uf}}</span> 
              </div>
              </div>
            </form>




            <div class="filter-result" v-if="data_plans">
            <p class="mb-30 planos-e">Planos Encontrado : {{total_plans}}</p>

              <div class="row">
                  <div class="col-12">
              <p class="bt-grid" @click="isActive = !isActive"><i v-if="isActive"  class="zmdi zmdi-view-stream"></i> <i v-else class="zmdi zmdi zmdi-apps"></i></p>
              </div>
              
              </div>
          

              
              

           
              <div class="job-box d-md-flex align-items-center justify-content-between mb-30" :class="{ active: isActive }"
                v-for="(plan, index) in data_plans" :key="index">
                <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                  <div class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                    <img :src="plan.operadoraLogo" :alt="plan.operadora" @error="setAltImg" class="img-fluid">

                    
                  </div>
                  <div class="job-content m-h">
                    <h5 class="text-center text-md-left">{{plan.operadora}} <br /> <span>{{plan.plano}}</span></h5>
                    <ul class="d-md-flex p-0 flex-wrap text-capitalize ff-open-sans">
                   
                      <li class="mr-md-4">
                        <i class="zmdi zmdi-hospital mr-2"></i>{{plan.segmentacao}}
                      </li>

                      <li class="mr-md-4">
                        <i class="zmdi zmdi-globe mr-1"></i>{{plan.abrangencia}}
                      </li>
                   
                      <li class="mr-md-4">
                        <i class="zmdi zmdi-accounts-outline mr-1" v-if="plan.tipo_acomodacao == 'coletiva'"></i> <i v-else class="zmdi zmdi-account-o mr-1"></i> {{plan.tipo_acomodacao}}
                      </li>
                   

                    </ul>
                  </div>
                </div>
                <div class="job-right my-4 flex-shrink-0">
                  <p class="money">  R$ {{plan.precos.total}}</p>
                  <a href="#" class="btn d-block w-100 d-sm-inline-block btn-light">Contratar</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>



  </main>
</template>

<script>
  import {
    api
  } from "@/services/plans.js";


  export default {
    name: 'Planos',
    components: {

  },
    
    data() {
      return {       
        isActive: '',
        error_uf:'', 
        error_ibge:'', 
        error_prof:'', 
        error_ent:'', 
        error_all:'', 
        state: '',
        uf: '',
        data_city: '',
        city: '',
        data_profission: [],
        profSelected: '',
        data_entity: [],
        entity: '',
        birth: '',
        data_plans: '',
        total_plans: '',
        error: false,
         spinner: false,
      };
    },
    methods: {
      setAltImg(event) { 
          event.target.src = "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image-300x225.png" 
      },
      getStates: async function () {
        this.spinner = true;
        try {
          await api.get(
            `https://gist.githubusercontent.com/letanure/3012978/raw/2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json`
            ).then(c => {
            this.state = c.data.estados;
            this.error = false;   
          
          });
        } catch (error) {
           this.error = true;    
          this.error_uf = 'ERRO! Estado não Localizado!';           
        } finally {
          this.spinner = false;
        }
      },
      getCity: async function (event) {
        this.spinner = true;
        this.uf = event.target.value;
         this.error = false;   
        try {
          await api.get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.uf}/municipios`).then(
            c => {
              this.data_city = c.data;
            });
        } catch (error) {
          this.error = true;    
          this.error_ibge = 'ERRO! Dados do IBGE não localizado!';           
        } finally {
          this.spinner = false;
        }
      },
      getCareer: async function (event) {
        this.spinner = true;
        this.city = event.target.value;
         this.error = false;   
        try {
          await api.get(
              `/profissao/${this.uf}/${this.city}?api-key=ddd70c32-fc98-4618-b494-a9698f824353`)
            .then(c => {
              this.data_profission = c.data;
            });
        } catch (error) {
          this.error = true;    
          this.error_prof = 'ERRO! Profissão não localizada!';            
        } finally {
          this.spinner = false;
        }
      },
      getEntity: async function () {
        this.spinner = true;
        this.profSelected = event.target.value;
         this.error = false;   
        try {
          await api.get(
            `/entidade/${this.profSelected}/${this.uf}/${this.city}?api-key=4b94dba2-5524-4632-939b-92df1c50a645`
            ).then(c => {
            this.data_entity = c.data;
          });
        } catch (error) {
           this.error = true;    
          this.error_ent = 'ERRO! Entidade não localizada!';            
        } finally {
          this.spinner = false;
        }
      },
      valueEntity(event) {
        this.entity = event.target.value;
      },
      listPlans: async function () {
           this.spinner = true;
        const dataBody = {
          "entidade": this.entity,
          "uf": this.uf,
          "cidade": this.city,
          "datanascimento": [this.birth]
        }
        try {
          await api.post('/plano?api-key=261fd4d0-fd9f-468a-afa9-f5a89ed3701c', dataBody).then(c => {
            this.data_plans = c.data.planos;
            this.total_plans = c.data.total;
          });
        } catch (error) {
               this.error = true;    
          this.error_all = 'ERRO! Confira os campos e preencha novamente!';    
          console.log(error)
        } finally {
          this.spinner = false;
        }
      },
    },
    created() {
      this.getStates();
    },
  }
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap.scss';
  @import url('https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css');


  body {
    background: #f5f5f5;
    margin-top: 20px;
  }

  .alert {
    margin: 1%;
    width: 100%;
    span {
      width:100%;
          display: block;
    }
  }

  .planos-e {

    font-weight: bold;
    font-size: 20px;
     margin:1%;
  }

  /* ===== formulario ===== */
  .career-form {
    background-color: #4e63d7;
    border-radius: 5px;
    padding: 0 16px;
    margin:1%;
  }

  .career-form .form-control {
    background-color: rgba(255, 255, 255, 0.2);
    border: 0;
    padding: 12px 15px;
    color: #fff;
  }

  .career-form .form-control::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #fff;
  }

  .career-form .form-control::-moz-placeholder {
    /* Firefox 19+ */
    color: #fff;
  }

  .career-form .form-control:-ms-input-placeholder {
    /* IE 10+ */
    color: #fff;
  }

  .career-form .form-control:-moz-placeholder {
    /* Firefox 18- */
    color: #fff;
  }

  .career-form .custom-select {
    background-color: rgba(255, 255, 255, 0.2);
    border: 0;
    padding: 12px 15px;
    color: #fff;
    width: 100%;
    border-radius: 5px;
    text-align: left;
    height: auto;
    background-image: none;
    font-size: 14px;
    option {
      color:#4e63d7;
    }
  }
h5 {
  span {
    font-size:14px;
  }
}
  .career-form .custom-select:focus {
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .career-form .select-container {
    position: relative;
  }

  .career-form .select-container:before {
    position: absolute;
    right: 15px;
    top: calc(50% - 14px);
    font-size: 18px;
    color: #ffffff;
    content: '\F2F9';
    font-family: "Material-Design-Iconic-Font";
  }

  .filter-result .job-box {
    -webkit-box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    border-radius: 10px;
    padding: 10px 35px;
  }

  ul {
    list-style: none;
  }

  .list-disk li {
    list-style: none;
    margin-bottom: 12px;
  }

  .list-disk li:last-child {
    margin-bottom: 0;
  }

  .job-box .img-holder {
    height: 65px;
    width: 100%;
    max-width:150px;
 
    font-family: "Open Sans", sans-serif;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 65px;
  }

  .career-title {
    background-color: #4e63d7;
    color: #fff;
    padding: 15px;
    text-align: center;
    border-radius: 10px 10px 0 0; 
  }

  .job-overview {
    -webkit-box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    border-radius: 10px;
  }

  @media (min-width: 992px) {
    .job-overview {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
    }
  }

  .job-overview .job-detail ul {
    margin-bottom: 28px;
  }

  .job-overview .job-detail ul li {
    opacity: 0.75;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .job-overview .job-detail ul li i {
    font-size: 20px;
    position: relative;
    top: 1px;
  }

  .job-overview .overview-bottom,
  .job-overview .overview-top {
    padding: 35px;
  }

  .job-content ul li {
    font-weight: 600;
    opacity: 0.75;
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
  }
  .job-box  {
      margin:1%;
  }



  @media (min-width: 768px) {
    .job-content ul li {
      border-bottom: 0;
      padding: 0;
    }

    .active.job-box {
  width:31.33%;
  float:left;
  margin:1%;
  padding:2%;
  display: block !important;
   .img-holder {
     height: 130px;
   }
   .job-content, .job-right, .job-left {
     float:left;
     width:100%;
     display: block !important;
         margin: 0 !important;
        
   }
   .m-h {
       min-height: 150px;
}
}


  }

  .job-content ul li i {
    font-size: 20px;
    position: relative;
    top: 1px;
  }

  .mb-30 {
    margin-bottom: 30px;
  }

  .money {
    font-size: 20px;
    color: #0c27bb;
    font-weight: bold;
  }
  .btn-light {
    color: #ffffff;
    background-color: #02ce1b;
    border: none;
  }
  @media (max-width: 768px) {
      .money {
    width:100%;
    text-align:center;
  }
  .bt-grid {
    display:none;
  }
  }
.bt-grid {
  font-size:36px;
  width:40px;
  text-align:right;
     color: #02ce1b;
     float:right;
     margin:1%;
   
     i{
cursor:pointer;
     }
     
}

  .spinner {
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 999;

  }

  .pissa {
  $pseudo: after;
  $duration: 3s;
  $elastic: cubic-bezier(.31,.01,.26,1.55);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100px;
    width: 100px;
    transform: translateX(-50%) translateY(-50%);
    border: solid 2px red;
    border-radius: 50%;
    display: none;
  }
  
  &::#{$pseudo} {
    content: "";
    display: block;
    border-radius: 50%;
    background-color: currentColor;
    color: #394eff;
    font-size: 20px;
    width: var(--size);
    height: var(--size);
    animation-name: loader;
    animation-duration: $duration;
    animation-iteration-count: infinite;
    position: absolute;
    left: calc(50% + (var(--size) * -0.5));
    transform-origin: 50% calc((var(--size) * 0.5) + (var(--offset) * 1));

    --offset: 1.5em;
    --size: 1em;
    --h-multi: .9;
    --v-multi: 1.5;
    
    @mixin collapsed {
      top: calc(50% + (var(--size) * -0.5));
      box-shadow: 
        0 0 0 0 currentColor, 
        0 0 0 0 currentColor;
    }
    
    @mixin expanded {
      top: calc(50% + (var(--size) * -0.5) + (var(--offset) * -1));
        box-shadow: 
          calc(var(--offset) * var(--h-multi)*-1) 
          calc(var(--offset) * var(--v-multi)) 0 0 currentColor,
          calc(var(--offset) * var(--h-multi)) 
          calc(var(--offset) * var(--v-multi)) 0 0 currentColor;
    }
    
    @mixin elastic {
      animation-timing-function: $elastic;
    }
    
    @mixin linear {
      animation-timing-function: linear;
    }
    
    @keyframes loader {        
      0% {
        @include collapsed;
        @include linear;
        transform: rotate(0deg);
      }
      
      10% {
        @include collapsed;
        @include elastic;
      }
      
      25% {
        @include expanded;
        @include linear;
        transform: rotate(0deg);
      }
    
      75% {
        @include expanded;
        transform: rotate(720deg);
      }
      
      90% {
        @include collapsed;
      }
      
      100% {
        @include collapsed;
        @include linear;
        transform: rotate(720deg);
      }
    }
  }
}

</style>