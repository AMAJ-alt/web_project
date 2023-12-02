<template>
  <div ref="editor"></div>
  <button @click.prevent="fun">click</button>
  <div class="hello"></div>
</template>

<script>
import $ from 'jquery';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from 'tui-image-editor';

export default {
  name: 'AboutView',
  methods: {
    fun() {
      $('.hello').appendTo('.helgfgfgflo');
    },
  },
  mounted() {
    const editorElement = this.$refs.editor;
    const editor = new ImageEditor(editorElement, {
      includeUI: {
        // loadImage: {
        //   path: './assets/avatar1.jpg',
        //   name: 'SampleImage',
        // },
        initMenu: 'filter',
        theme: {
          'menu.normalIcon.path': '/icons.svg#ic_menu_black_24px',
          'menu.activeIcon.path': '/icons.svg#ic_menu_white_24px',
          'menu.disabledIcon.path': '/icons.svg#ic_menu_black_24px',
          'menu.hoverIcon.path': '/icons.svg#ic_menu_black_24px',
          'submenu.normalIcon.path': '/icons.svg#ic_submenu_white_24px',
          'submenu.activeIcon.path': '/icons.svg#ic_submenu_black_24px',
        },
        menuBarPosition: 'bottom',
      },
      usageStatistics: false,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    });
    console.log(editor);
    // editor.loadImageFromURL('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUAnAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAYFB//EADkQAAEEAQIFAgQEAwcFAAAAAAEAAgMRBBIhBRMxQVEiYQYUcaEygZHwUrHRI0JicsHh8QcVFiQz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECBAMF/8QAJBEAAgICAgEEAwEAAAAAAAAAAAECEQMhEjFBBCJRYTIz8BP/2gAMAwEAAhEDEQA/ANpy/CDGQeikATtK2WZEiHQ49k5utu+6k0HyUeryUrGkAlf3ak1k9WJwvyU4A+Umytke3dtJKB2UyLpFjpEYiB7I5Y8KYP8AZLYSsdIh5YRpCldv0TCNuoQFEekdkx7QVIb70kseEySLlo5al1/4UavLQnbFSIhGlEJKk1j+FOEnsi2FRIuSU7lFS6yeycCUrY+KG0EoajdG6Q0OpIQKSJEBYUhG6N0ALqARqCKJRpPhAbEtvgpC4e6XQSl5ZQGxmrwl1n2T+UfCTlnwnoKY0u9gkseAn8tHLPhFhTGWPARY7ttO0HujSjQbG+j+BPBj8EJNKNKQbFIZ2d9kUP4kaUvLKLCmKhCErKoQpaQhFhQbI2QkSsdC0PKUAeU1CLAdQ8paHlMRYBFkb9PdAEleHIIPkKNLZSGO+pCK90xLRRYUKdu6AR3SUUaUWFDvT7oGlNLSEiAJLb5TtTVCnUPKAEQo+Y1HMCKHZIlpR86kc4XZ6+UqC0SEEGiKSFNdlOcN6pM523QfVFMLRKkUfOHhHOanQWiQbkDysZjfEuHn5mTymkTQyOjkEhvcGvT4Gx6UtPnt+axZMdr3sErdJLTRrvv227ryrL4hwv4bz5cbhPC3HNoDXNklzBYsdDdi9+nfdJocXs9E4TNxGSeOGbLYWtJcWaBqLO1n+i7qwP8A06MudLmca4hJJNmuPIbI4UGs2JDfbp08ebWxzc5uLHu9vMI2ZRLj70N1EpqKtlRg5OkXrRazMWd8Rz8fYJMfBbwmnW6MOD+m16q7+Au7zw3YuFq47Vky06LNosqsJ7OxQZf1Tpi5Fm0Wq5mob/yTRO3+KkUw5FpCg54HVwSfMsPcIpitHNExca1EpTK5mxsFc9kvT1Ob4pSyZMrg0ODXV/eqiumzlqi0cr3Ub8o36SVWErSfWywkcW9W3XgpiZP81L2cnMyJL3P6qsudxTOGPkYsJ5jSZWklrS7UDtVAG0m0kC2d/wCad0d9kfNDT1sqozcWCaI6EUQhzmB/WmjraYHP+JJ2ZzYuHPmkYyQh8rI3aTI3s0nwe9KxwfBwuGYsrOF4mNHI5ps8sB5PYF3WrWS+KOI/LcfjcwBwjjZt72SuxwjiAynlzd7JrexXsuWSNmrC0l9mg4TxTJdwbGZBi/Ky8poe+ZtaXVvQuzv5pTYx6u5gc8n1vc8FzlxzLK5oZI9z9PZJDNj1Uuj/ADFycMCgrXZynnc3T6O9NNyHlsjDY226EeVE/IiijDzpcHdN1nMviuFjMIbLrfq/Cw3S5WVxuQxB+O1ge53paTZrz+/ddFA4vJRsznwOBOl/tpUBy5ZLIdygDXqWIyeM5uRAC+QxMDhRYaN0qr86TJbeS+aWQfg1P2HTdXwJeQ3LuJth18zIYHNolrnD8tlWk+KsZmlsTHzvcaGjYfdYlrQ54a/US6wR0rsN/wB9E+DTE0yPe5rwPTy+pP17BPiiebPQXce4fG25Zg11Xpok/bqq/wD5Nw+gS6UWLosKxoy4JIHtyXuEukFm3U30/mujw/M4VyD804tkDv4ib91LpFq2zTB53QHEdEyxpJ1bhIHjuLCBEpcTuCkHvaaTQ1A23z4VeXMjjbYOs9gEgLgND2VPiOVBivjnyXvcW/8Azj5paCQLse/1VDJz5mSOHODKselv+xK58smNmPkhyJDPkNidRcARCCLBN7Dp1XLLJJdl47s7WD8QQZsby94i011eDf6WoMrjMAdphuQ+egWbwZhK3RGA6IMcQXs0uJvoK7DdSl103Rq33ryrwvlEjI6dFHjD35vFJ3MbqeIg9rWjqG3Y/QlW/hPLlHFRg40HzHNc18bmuoMaRdk77C1W4rE9kzMwSOx5IXhrXu/CPANbj6/8peG5zuC8YxeLzUyN+psvKdzG7+PY9au1zzWk+PZpwNNq+jR/EHzEOdLAx7tLaNB9Nrp+e4K4UzND3APsNJBIP3AWv4jHh/FWE3K4XLGMxm+gnTrHiisrk4b8dkrMpropGmuURvafp86yR+/gj1OCWOb1oqnTpJLiNuldVEXEAddPX809w9INj6KF5AIvp1G61IyMUPvSHWWjx9FJjGEOL5mlwY30N7OPYJ8+DJFEJHOaG2Nhf7tVTYaaNnsi0+h009k0j2uDXH0nTuD9f+FDI/WKI6eO6aSQSKOoe378JCCL6gVYPlAD/mJGsc0OP+IDa6NpOY49K28qNsukWKtp6+FNEx7w5zSANRRYUbuWYtYXMBIutR6AqsMk6HBzrcRsb2CtNifnSfK40T3EOpzQa3737DZXpvhviOKz/wBeOGUncgOFj23/AHssyyxaNLxNM4eQ+VvokLrFEhx23+irfMyNt+v8TSB/JXHcK4gZJGyYWTro3UZO/wBeiefhziEjWvAh5bhepsl6fII8/ZVzh5ZDxz8I4/MYPU/Vt2aC41XWgDdI4VFk5s0pfinIDonRgRwfi1NIJ6Chv3I/Najhnwr6i7iRsEECJpIv/MftS0kMcEULYYGxsiAI0xNHb6LLmyKT0aMWFr8jE8B+CMhu85bjY1mgXa5D232od/su1l/B+KzDezh80rcweqOWUBzbHYgAbLQRysjb6AS3vXdWI3BzXa2u6emhuVEZzXTO3+UPg8W45h/EODFO7ivC3Nhoh88fqYB51C6H1XR+Ho4c7HETZYtIaLjEfqPtvQr81665rHRGhqOmiNI9Xais9k/AvATMcmLGkxJqJ1YsxjA+jeg/RW8raJjjUXo4fDvhrhrJHAwugfq1M5L9LwPetvsu3/2nHyWSsz3O4nFYMbJA0Pi2r0vFda7qk7gfEcNrzwvNE8Tzuyf8Z7GnjY/mB9VXm4vxnhUHP4jw6T5OM/2k0YaKFgai0OJod/3WepXZ35KqMdxfAdhZmVCGuYI5SGNcN9G5H2U0ONj4UUc2dA7mVqAsBzvy7D3K9EyIeD/FPDYxHI0yhtxTD8Q/29l5vxnBnwuIyQZj9UsdA72CKFH6VS3Y8yy+3yYsuB4nyogy81+a8yPNMBtjf7oHegqbiWua2IG3fdW8dmphc+F+hzSAbAG3jbr0/VRR5j8eOWNrGtkf6S4t6Dx9vuu8X4Rna8srWdN1Zr9/6pHGtj+Sa6SgR0V7g3CcnjGSIYgWxt3klLSQ0f19lTaStkpNukUGkGRo2Nmq8q98u3HJiy5hjyivRVmq2JpdSIYsOW4YGA3Tiu0OzMh5om99vPsLXUxRI1jvlMLHyGucXOmnh5r3k9ye21bdlylko6xxG2w3vwTJCXump/4n9ST1P26K0XufFKC51dOtH632QheYuqPUaRVxRJzRC6eVwA1WXb9VNw6iwbdN/wDVIhEAmSTymN8bALMjtNntsT0/JNl0x47AGg2Nye6EKiBkETXY7JyPxNB077WVa1lrmb9dkITYghl/tQ0NALrBPn3T3bmtxTS479f3SEIAY5mlrmgnUP7xUUkUWXi8qaMGKeJzHt8g7FCFYjHf9O4vl+D5gDy4Y2RLHHYFgNc4X9T/AE8LK8WypMvjOU+U3/aPH6Gh/IJEJek/dNh6vWGCOcZ2gt5keprg1tA117/Xbwunj48T5p4pY2vdytYfu2um1AgfmhC0Zfb1/dGKG+zvcI+DMGTEZm5ksk24PLHpBB7E9e/suvlcXx+C4skWDw2JgaNqftfTfbdCEk3J0zs0oL2mY+KRJj4OHNzLfklwprQ1rAK2AH1WbdxDJjoMmlbY3p6ELvjS4nDI3yP/2Q==', 'SampleImage');
  },
};
</script>
