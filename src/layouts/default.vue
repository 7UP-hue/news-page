<template>
  <main class="h-100%">
    <div class="my-container">
      <Header />
      <router-view />
      <!-- <div class="mt-5 flex">
        <Aside />
        <router-view  class="w-880px"/>
      </div> -->
    </div>
  </main>
</template>
<style scope>
.my-container {
  width: 1100px;
  margin: 0 auto;
}
</style>