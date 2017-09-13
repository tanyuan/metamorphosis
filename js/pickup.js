AFRAME.registerComponent("hover-effect",{init:function(){var a=this.el,b=a.getAttribute("scale"),c={x:1.2*b.x,y:1.2*b.y,z:1.2*b.z};a.addEventListener("mouseenter",function(b){a.setAttribute("scale",c)});a.addEventListener("mouseleave",function(c){a.setAttribute("scale",b)})}});
AFRAME.registerComponent("water-cup",{init:function(){var a=this.el;a.addEventListener("mouseenter",function(b){a.setAttribute("scale","2.5 2.5 2.5")});a.addEventListener("mouseleave",function(b){a.setAttribute("scale","2.0 2.0 2.0")});a.addEventListener("click",function(b){"wake"===finite_state?(finite_state="water",set_event_plane(finite_state),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),action_text_handler=function(){a.setAttribute("visible",
!0);reset_event_plane();second_stage()}):(set_event_plane(finite_state,"#water-cup-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("A cup of water. I don't need it right now.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()});action_text.addEventListener("click",action_text_handler)})}});
AFRAME.registerComponent("envelope",{init:function(){var a=this.el;a.addEventListener("click",function(b){1===third_stage_state?(finite_state="paper",set_event_plane(finite_state),a.setAttribute("visible",!1),action_text_primary_handler=function(){action_text_primary.setAttribute("visible",!1);action_text_secondary.setAttribute("visible",!1);third_stage()},action_text_secondary_handler=function(){a.setAttribute("visible",!0);finite_state="free";reset_event_plane()},action_text_handler=function(){1===
third_stage_state?(third_stage_state++,event_text.setAttribute("text",white_text("Oh right, I signed up for the special forces, and my term starts tomorrow."))):2===third_stage_state?(third_stage_state++,event_text.setAttribute("text",white_text("But how come my documents are in this unknown place?"))):3===third_stage_state?(third_stage_state++,event_text.setAttribute("text",white_text("No matter what, I'd better go back to my place and prepare for the enlistment ASAP.")),action_text.setAttribute("text",
black_text("PUT BACK"))):4===third_stage_state&&(a.setAttribute("visible",!0),finite_state="free",reset_event_plane(),help_text.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),setTimeout(function(){camera_text.setAttribute("visible",!0);camera_text.setAttribute("text",white_text("The phone on the table is ringing. Maybe I should get it."));document.querySelector("#phone").emit("phone-ring")},5E3))}):(set_event_plane(finite_state,"#envelope-hand"),a.setAttribute("visible",!1),action_text.setAttribute("visible",
!1),action_text_primary.setAttribute("visible",!0),action_text_secondary.setAttribute("visible",!0),event_text.setAttribute("text",white_text("My enlistment documents.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_primary.setAttribute("text",black_text("READ DOCUMENT")),action_text_secondary.setAttribute("text",black_text("PUT BACK")),action_text_primary_handler=function(){action_text_primary.setAttribute("visible",!1);action_text_secondary.setAttribute("visible",!1);action_text.setAttribute("visible",
!0);event_text.setAttribute("text",white_text('"John Doe would be serving the country in the Navy from '+current_date_string+" to "+future_date_string+'..."'))},action_text_secondary_handler=function(){a.setAttribute("visible",!0);reset_event_plane()},action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()});action_text.addEventListener("click",action_text_handler);action_text_primary.addEventListener("click",action_text_primary_handler);action_text_secondary.addEventListener("click",
action_text_secondary_handler)})}});
AFRAME.registerComponent("phone",{init:function(){var a=this.el;a.addEventListener("click",function(b){if(1<fourth_stage_state)set_event_plane(finite_state,"#phone-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("Someone's phone. There's nothing I can do with it.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()};
else if(1<third_stage_state){finite_state="phone";set_event_plane(finite_state);a.setAttribute("visible",!1);camera_text.setAttribute("visible",!1);help_text.setAttribute("visible",!1);document.querySelector("#phone").emit("phone-end");var c=document.querySelector("#phone-hand");action_text_handler=function(){1===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"Hey, John! Where the hell are you?"')),action_text.setAttribute("text",black_text("NEXT"))):2===fourth_stage_state?
(fourth_stage_state++,event_text.setAttribute("text",white_text("Who's this?"))):3===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"Jane! Your girlfriend! Are you out of your mind?"'))):4===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("Oh\u2026, I\u2019m sorry. I'm somewhere strange."))):5===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"What do you mean by strange? I have been waiting for you at the meeting point for hours!"'))):
6===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("What meeting point?"))):7===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"The place where we should meet on the day you come back from the military?"'))):8===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("What do you mean by that? My term starts from "+current_date_string+", and that's tomorrow."))):9===fourth_stage_state?(fourth_stage_state++,
event_text.setAttribute("text",white_text("\"John, are you out of your mind? It's "+future_date_string+' today, and today should be the last day of your service."'))):10===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("You're kidding me! I haven't even joined the special forces!"))):11===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"Calm down, John. I\'ll go find you and we will figure things out together."'))):12===fourth_stage_state?
(fourth_stage_state++,event_text.setAttribute("text",white_text("But how are you going to find me if I don't even know where I am?"))):13===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"Are you at a place with an abstract painting on the wall?"'))):14===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("How'd you know?"))):15===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text('"Stay there. I\'ll be there right away."')),
action_text.setAttribute("text",black_text("END CALL"))):16===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("Everything feels so weird. If that is true, why can't I recall anything from the past three years?")),action_text.setAttribute("text",black_text("NEXT"))):17===fourth_stage_state?(fourth_stage_state++,event_text.setAttribute("text",white_text("I don't feel well. I think I might throw up.")),action_text.setAttribute("text",black_text("NEXT"))):18===fourth_stage_state&&
(a.setAttribute("visible",!0),c.setAttribute("visible",!1),finite_state="free",reset_event_plane(),help_text.setAttribute("visible",!0),camera_text.setAttribute("visible",!1),help_text.setAttribute("text",white_text("Find a place to throw up.")),setTimeout(function(){help_text.setAttribute("visible",!1)},5E3))}}else set_event_plane(finite_state,"#phone-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("Someone's phone. There's nothing I can do with it.")),
action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()};action_text.addEventListener("click",action_text_handler)})}});
AFRAME.registerComponent("toilet-door",{init:function(){this.el.addEventListener("click",function(){1<fourth_stage_state?"free"===finite_state?(set_event_plane("toilet_door_enter"),finite_state="toilet",action_text_primary_handler=function(){reset_event_plane();var a=document.querySelector("a-camera");a.setAttribute("position","-4.2 2.5 10.980");a.setAttribute("rotation","0 270 0")},action_text_secondary_handler=function(){reset_event_plane()},action_text_primary.addEventListener("click",action_text_primary_handler),
action_text_secondary.addEventListener("click",action_text_secondary_handler)):"toilet"===finite_state&&(set_event_plane("toilet_door_leave"),action_text_primary_handler=function(){finite_state="free";reset_event_plane();var a=document.querySelector("a-camera");a.setAttribute("position","-5.04 2.5 5.025");a.setAttribute("rotation","0 0 0");camera_text.setAttribute("text",white_text("Someone is knocking at the door. Maybe I should answer it."));camera_text.setAttribute("visible",!0);setTimeout(function(){camera_text.setAttribute("visible",
!1)},5E3)},action_text_secondary_handler=function(){reset_event_plane()},action_text_primary.addEventListener("click",action_text_primary_handler),action_text_secondary.addEventListener("click",action_text_secondary_handler)):(camera_text.setAttribute("text",white_text("There is something else I need to do first.")),camera_text.setAttribute("visible",!0))})}});
AFRAME.registerComponent("night-stand",{init:function(){var a=this.el;a.addEventListener("click",function(){"free"===finite_state&&(set_event_plane(finite_state,"#night-stand-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("A nightstand. There's nothing special with it.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()},
action_text.addEventListener("click",action_text_handler))})}});
AFRAME.registerComponent("paper",{init:function(){var a=this.el;a.addEventListener("click",function(){"free"===finite_state&&(set_event_plane(finite_state,"#paper-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("A stack of paper. There's nothing special with it.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()},
action_text.addEventListener("click",action_text_handler))})}});
AFRAME.registerComponent("plant",{init:function(){var a=this.el;a.addEventListener("click",function(){"free"===finite_state&&(set_event_plane(finite_state,"#plant-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("A plant. Seems that the owner of this room has a green thumb.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",!0);reset_event_plane()},
action_text.addEventListener("click",action_text_handler))})}});
AFRAME.registerComponent("toilet",{init:function(){this.el.addEventListener("click",function(){event_text.setAttribute("text",white_text("I need to use the toilet, I am going to throw up."));action_text.setAttribute("text",black_text("USE TOILET"));set_event_plane("free");action_text_handler=function(){reset_event_plane();camera_text.setAttribute("text",white_text("Feeling better."));camera_text.setAttribute("visible",!0);setTimeout(function(){camera_text.setAttribute("visible",
!1)},3E3)};action_text.addEventListener("click",action_text_handler)})}});
AFRAME.registerComponent("look-at-mirror",{init:function(){this.el.addEventListener("click",function(){set_event_plane("free");event_text.setAttribute("text",white_text("Why there is a gigantic insect in the mirror?"));action_text.setAttribute("text",black_text("NEXT"));action_text_handler=function(){1===fifth_stage_state?(fifth_stage_state++,event_text.setAttribute("text",white_text("What! The! Fuck! It's me! I become this gigantic insect!"))):2===fifth_stage_state?(fifth_stage_state++,
event_text.setAttribute("text",white_text("No, no, no. This is not possible. This is fucking crazy!"))):3===fifth_stage_state?(fifth_stage_state++,event_text.setAttribute("text",white_text("Oh no..., I am going to puke again..."))):4===fifth_stage_state?(fifth_stage_state++,event_text.setAttribute("text",white_text("Errr..., I don't feel well..."))):5===fifth_stage_state?(fifth_stage_state++,event_text.setAttribute("text",white_text("My throat is burning again. And it's getting worse..."))):6===fifth_stage_state?
(fifth_stage_state++,event_text.setAttribute("text",white_text("Ahhhh... I...I..., can't speak!"))):7===fifth_stage_state?(fifth_stage_state++,event_text.setAttribute("text",white_text("This place is fucking weird. What happened to me?"))):8===fifth_stage_state?(fifth_stage_state++,event_text.setAttribute("text",white_text("I need to get out of here.")),action_text.setAttribute("text",black_text("END"))):(event_text.setAttribute("visible",!1),action_text.setAttribute("visible",!1))};action_text.addEventListener("click",
action_text_handler)})}});
AFRAME.registerComponent("front-door",{init:function(){this.el.addEventListener("click",function(){1<fifth_stage_state?(set_event_plane("front_door_enter"),finite_state="combat",document.querySelector("#john_heart").setAttribute("visible",!0),action_text_handler=function(){reset_event_plane();var a=document.querySelector("a-camera");a.setAttribute("position","-4.5 1.8 -10");a.setAttribute("rotation","0 0 0")},action_text.addEventListener("click",action_text_handler)):(camera_text.setAttribute("text",white_text("There is something else I need to do first.")),
camera_text.setAttribute("visible",!0))})}});
AFRAME.registerComponent("book",{init:function(){var a=this.el;a.addEventListener("click",function(){"free"===finite_state&&(set_event_plane(finite_state,"#book-hand"),a.setAttribute("visible",!1),camera_text.setAttribute("visible",!1),help_text.setAttribute("visible",!1),event_text.setAttribute("text",white_text("A stack of books. Seems that the owner of this room has a green thumb.")),action_text.setAttribute("text",black_text("PUT BACK")),action_text_handler=function(){a.setAttribute("visible",
!0);reset_event_plane()},action_text.addEventListener("click",action_text_handler))})}});
AFRAME.registerComponent("painting",{init:function(){this.el.addEventListener("click",function(){!1===mail_show?(mail_show=!0,camera_text.setAttribute("text",white_text("Something fell on the door. Maybe I should take a look at it.")),camera_text.setAttribute("visible",!0),document.querySelector("#mail").setAttribute("visible",!0),setTimeout(function(){camera_text.setAttribute("visible",!1)},5E3)):(camera_text.setAttribute("text",white_text("A abstract painting. There is nothing special with it.")),
camera_text.setAttribute("visible",!0),setTimeout(function(){camera_text.setAttribute("visible",!1)},3E3))})}});
AFRAME.registerComponent("mail-floor",{init:function(){var a=this.el;a.addEventListener("click",function(){set_event_plane("mail");a.setAttribute("visible",!1);action_text_primary_handler=function(){action_text_primary.setAttribute("visible",!1);action_text_secondary.setAttribute("visible",!1);event_text.setAttribute("text",white_text('"Dear John, you must be wondering why you would receive a letter written by yourself."'));action_text.setAttribute("visible",!0)};action_text_secondary_handler=function(){a.setAttribute("visible",
!0);reset_event_plane()};action_text_handler=function(){1===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"And by the time you read this letter, you might figure out that something\'s wrong with your body."'))):2===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"So this letter is meant to tell you what happened."'))):3===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"You\'ve particpated in an elite program while serving the country."'))):
4===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"The program acclaimed that its purpose was to improve soldiers\' physical strength through medical injections."'))):5===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"However, what the program didn\'t tell you was that the possible failure rate is way higher than the success rate."'))):6===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"And a variety of side effects may occur, including body tansformation of any kind, which was happening to you right now."'))):
7===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"According to your officials, you would soon be injected with a cure."'))):8===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"And you would be sent back to your house for recovering."'))):9===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"However, it\'s very likely that there is no such thing as an cure."'))):10===extra_stage_state?(extra_stage_state++,
event_text.setAttribute("text",white_text('"I am not sure what would happen next."'))):11===extra_stage_state?(extra_stage_state++,event_text.setAttribute("text",white_text('"Be aware. Be safe."')),action_text.setAttribute("text",black_text("END READING"))):12===extra_stage_state&&(a.setAttribute("visible",!0),reset_event_plane())};action_text.addEventListener("click",action_text_handler);action_text_primary.addEventListener("click",action_text_primary_handler);action_text_secondary.addEventListener("click",
action_text_secondary_handler)})}});