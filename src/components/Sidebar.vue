<template>
  <div class="hidden main-sidebar">
      <vs-sidebar
        v-model="active"
        open
        :reduce="reduce"
        background="#2C4484"
        textWhite
        >
        <template #logo>
          <!-- ...img logo -->
        </template>
        <vs-sidebar-item id="Collapse" @click.native="reduceSidebar">
          <template #icon>
            <!-- <i class='bx bx-home'></i> -->
             <img class="icon-nav" src="@/assets/icons8-menu.svg"  alt=""> 
          </template>
          Collapse
        </vs-sidebar-item>
        <vs-sidebar-item id="history" to="/history">
         
          History
        </vs-sidebar-item>
        <vs-sidebar-item id="map" to="/">
         
          Map
        </vs-sidebar-item>

        <!-- 
        <vs-sidebar-item id="market">
          <template #icon>
            <i class='bx bx-grid-alt'></i>
          </template>
          Market Overview
        </vs-sidebar-item>
        <vs-sidebar-item id="Music">
          <template #icon>
            <i class='bx bxs-music'></i>
          </template>
          Music
        </vs-sidebar-item>
        <vs-sidebar-item id="donate">
          <template #icon>
            <i class='bx bxs-donate-heart' ></i>
          </template>
          Donate
        </vs-sidebar-item>
        <vs-sidebar-item id="drink">
          <template #icon>
            <i class='bx bx-drink'></i>
          </template>
          Drink
        </vs-sidebar-item>
        <vs-sidebar-item id="shopping">
          <template #icon>
            <i class='bx bxs-shopping-bags'></i>
          </template>
          Shopping
        </vs-sidebar-item>
        <vs-sidebar-item id="chat">
          <template #icon>
            <i class='bx bx-chat' ></i>
          </template>
          Chat
        </vs-sidebar-item> -->
        <!-- <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <img src="/avatars/avatar-5.png" alt="">
            </vs-avatar>

            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>

              <template #badge>
                28
              </template>
            </vs-avatar>
          </vs-row>
        </template> -->
      </vs-sidebar>
  </div>
</template>

<script>
export default {
    data(){
        return {
            active: false,
            reduce: true,
        }
    },
    methods:{
        reduceSidebar(){
            this.reduce = !this.reduce;
            if(this.reduce){
                document.querySelector(".page-container").classList.remove("Notreduced")
            }else{
                document.querySelector(".page-container").classList.add("Notreduced")
            }
        }
    }
}
</script>

<style lang="scss">
/************* Start Of Override Vuesax Classes ****************/
.main-sidebar{
  .vs-sidebar-content .vs-sidebar__logo img {
    max-width: 230px !important;
    max-height: 97px !important;
  }

  .vs-sidebar-content{
    border-radius: 0;
  }

  .vs-sidebar-content{
    max-width:220px !important;
    z-index: 800 !important;
  }

  .vs-sidebar__item__arrow{
    margin-right:50px !important;
  }
}



/*************** End Of Override Vuesax Classes ****************/
.main-sidebar{
  .icon-nav{
    width: 50px;
    height: 23px;
  }
}
</style>