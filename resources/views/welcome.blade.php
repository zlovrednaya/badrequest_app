<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>wtf</title>
        @viteReactRefresh
        @vite('resources/js/app.js')
        

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Styles -->

        
    </head>
    <body class="antialiased">
      <div id="root"></div>
      
      <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
</html>
