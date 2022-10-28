# HHG FRONTEND

This is a gui for "hhg" tool ( [https://gitlab.com/dom/happy-hacking-gnu](https://gitlab.com/dom/happy-hacking-gnu)).  
You can remap your HHKB (Happy Hacking Keyboard) Hybrid under Linux.

NOT FINISHED YET.  

![](./screenshot.png)

## Requirements

- Node.JS
- Neutralino.JS : `npm install -g @neutralinojs/neu`

## How to compile

```sh
git clone https://github.com/steevelefort/hhg-gui.git
cd hhg-gui
cd hhkb-react
npm install
npm run build
cd ..
neu build --release
```
Builds are now in the dist folder.

## Usage

You could :
- Drag a scancode to assign it to a key
- Drag a key on another to swap the keys

## Warning

**IT IS EXPERIMENTAL. USE IT AT YOUR OWN RISK.**  
Beware, you can remap all keys and you could remove some standard shortcuts (change source, etc.)

## Licence

This software is released under the MIT.  




