# Coding in Clave
This website is based on [jekyll-uno](https://github.com/joshgerdes/jekyll-uno).

## jekyll-uno

Jekyll-Uno - a minimal, responsive theme for Jekyll based on the [Uno](https://github.com/daleanthony/Uno) theme for Ghost.

> :warning:
  This theme requires ruby and rubygems installed

### Features

* Clean layout
* Resposive layout
* Pagination
* Syntax highlighting
* Social links
* Tags listing page
* Categories listing page
* Google Analytics integration
* Disqus integration

---

### Install and Test

1. Download or clone repo `git clone git@github.com:joshgerdes/jekyll-uno.git`
2. Enter the folder: `cd jekyll-uno/`
3. If you don't have bundler installed: `gem install bundler`
3. Install Ruby gems: `bundle install`
4. Start Jekyll server: `bundle exec jekyll serve --watch`

Access via: [http://localhost:4000/jekyll-uno/](http://localhost:4000/jekyll-uno/)

If you would like to run without using the `github-pages` gem, update your Gemfile to the following:

```
source 'https://rubygems.org'
gem 'jekyll-paginate'
gem 'jekyll-watch'
gem 'kramdown'
gem 'kramdown-parser-gfm'
```
---

## Copyright and license

### Coding in Clave

The content of the blog are property of Vincenzo Moreno Luna, all rights reserved
Copyright (c) Vincenzo Moreno Luna

### Jekyll-Uno

Jekyll-Uno is under the MIT license:

The MIT License (MIT)

Copyright (c) 2016 Josh Gerdes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.