const { Gabby } = require('../framework/Gabby');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../cmds/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

Gabby(
    {
        nomCom : 'alive',
        categorie : 'General'
        
    },async (dest,gabby,commandOptions) => {

 const {ms , arg, respond,superUser} = commandOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , link} = data;


        var mode = "public";
        if (s.MODE != "yes") {
            mode = "self";
        }
      
    
     
    moment.tz.setDefault('Etc/GMT');

// format 
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*My master* : ${s.NOM_OWNER}
*Mode* : ${mode}
*Date* : ${date}
*hour* : ${temps}

 ${message}
 
 *I am Gabby, wassup*
 
 *Gabby_MD version 1.0*`

 if (link.match(/\.(mp4|gif)$/i)) {
    try {
        gabby.sendMessage(dest, { video: { url: link }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("💢💢 Menu error " + e);
        respond("💢💢 Menu error " + e);
    }
} 
// picture type
else if (link.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        gabby.sendMessage(dest, { image: { url: link }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("💢💢 Menu error " + e);
        respond("💢💢 Menu error " + e);
    }
} 
else {
    
    respond(alivemsg);
    
}

    } else {
        if(!superUser) { respond("no alive msg was set master") ; return};

      await   respond("You have not registered your alive yet; to do so, type your message and your image or video link after alive in this format: .alive message;link.");
         respond(" I'm taking my time to explain it to you; dude, it's up to you if you're wrong.")
     }
 } else {

    if(!superUser) { respond ("I am here master") ; return};

  
    const text = arg.join(' ').split(';')[0];
    const tlink = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(text , tlink)

respond('succeded in alive test master')

}
    });
