<?php $page_title = ''; ?><?php $page_permalink = ''; ?><?php $page_description = ''; ?><?php $page_cover = ''; ?><!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1" name="viewport">
    <meta content="telephone=no" name="format-detection">
    <title><?php echo htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8'); ?></title>
    <meta itemprop="image">
    <meta name="description">
    <meta property="og:url">
    <meta property="og:title">
    <meta property="og:description">
    <meta property="og:image">
    <meta content="article" property="og:type">
    <meta content="ja_JP" property="og:locale">
    <meta content="dskd" property="og:site_name">
    <link rel="canonical" itemprop="url">
    <link href="/css/style.css" rel="stylesheet" media="only screen">
    <script type="text/javascript" src="/js/vendor.js"></script>
  </head>
  <body><?php include './includes/header.php' ?>
    <main>
      <div class="contents"></div>
    </main><?php include './includes/footer.php' ?>
  </body>
</html>