(function(){
  var html=document.documentElement; html.classList.add('js');
  var book=html.getAttribute('data-book'); var store=null;
  try{ store=window.localStorage; store.getItem('_t'); }catch(e){ store=null; }
  function get(k){ try{ return store?store.getItem(k):null; }catch(e){ return null; } }
  function set(k,v){ try{ if(store){ if(v==null||v==='') store.removeItem(k); else store.setItem(k,v); } }catch(e){} }
  function autosize(t){ t.style.height='auto'; t.style.height=(t.scrollHeight+2)+'px'; }
  function autosizeAll(root){ (root||document).querySelectorAll('.memo').forEach(autosize); }

  // 글자 크기 (가A 버튼: 보통 → 크게 → 더 크게 → 작게)
  var sizes=['','fs-l','fs-xl','fs-s']; var fsKey=book+':fs';
  var cur=get(fsKey); if(cur) html.classList.add(cur);
  document.getElementById('fontBtn').addEventListener('click',function(){
    var i=sizes.indexOf(get(fsKey)||''); var next=sizes[(i+1)%sizes.length];
    sizes.forEach(function(c){ if(c) html.classList.remove(c); }); if(next) html.classList.add(next); set(fsKey,next);
    autosizeAll();
  });

  // 과 전환
  var lessons=[].slice.call(document.querySelectorAll('.lesson')); var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function show(id,scroll){
    var target=document.getElementById(id); if(!target){ target=lessons[0]; id=target.id; }
    lessons.forEach(function(l){ l.classList.toggle('active',l===target); });
    tabs.forEach(function(t){ var on=t.getAttribute('data-target')===id; t.classList.toggle('active',on); if(on&&t.scrollIntoView) t.scrollIntoView({block:'nearest',inline:'center'}); });
    set(book+':last',id);
    if(scroll) window.scrollTo(0,0);
    autosizeAll(target);
  }
  function fromHash(){
    var h=location.hash.replace('#',''); var m=h.match(/^(l\d+)(?:-(.+))?$/);
    if(m){ show(m[1],!m[2]); if(m[2]){ var el=document.getElementById(h); if(el) setTimeout(function(){ el.scrollIntoView({block:'start'}); },0); } }
    else show(get(book+':last')||lessons[0].id,false);
  }
  window.addEventListener('hashchange',fromHash);
  fromHash();

  // 메모·체크 저장 (이 기기 브라우저의 localStorage)
  document.querySelectorAll('.memo').forEach(function(t){
    var k=t.getAttribute('data-key'); var v=get(k); if(v){ t.value=v; t.classList.add('filled'); }
    t.addEventListener('input',function(){ set(k,t.value); t.classList.toggle('filled',t.value.trim()!==''); autosize(t); });
    autosize(t);
  });
  document.querySelectorAll('input[type=checkbox][data-key]').forEach(function(c){
    var k=c.getAttribute('data-key'); c.checked=get(k)==='1';
    c.addEventListener('change',function(){ set(k,c.checked?'1':''); });
  });
  document.querySelectorAll('.clear-btn').forEach(function(b){
    b.addEventListener('click',function(){
      var sec=document.getElementById(b.getAttribute('data-lesson'));
      if(!confirm('이 과에 적은 메모와 체크 표시를 모두 지울까요?')) return;
      sec.querySelectorAll('.memo').forEach(function(t){ t.value=''; t.classList.remove('filled'); set(t.getAttribute('data-key'),''); autosize(t); });
      sec.querySelectorAll('input[type=checkbox][data-key]').forEach(function(c){ c.checked=false; set(c.getAttribute('data-key'),''); });
    });
  });
  // 보내는 사람 이름 (모든 과의 입력란을 같은 값으로 유지)
  var nameInputs=[].slice.call(document.querySelectorAll('.sender-name'));
  var savedName=get(book+':name')||'';
  nameInputs.forEach(function(inp){
    inp.value=savedName;
    inp.addEventListener('input',function(){ var v=inp.value; set(book+':name',v.trim()); nameInputs.forEach(function(o){ if(o!==inp) o.value=v; }); });
  });
  function senderName(){ return (get(book+':name')||'').trim(); }

  // 메모가 포함된 교재 HTML 만들기
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function pad(n){ return (n<10?'0':'')+n; }
  function stamp(){ var d=new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes()); }
  var bookTitle=document.querySelector('.brand-title').textContent.trim();
  function buildExport(lessonId){
    var root=document.documentElement.cloneNode(true);
    root.classList.remove('js');
    var name=senderName(); var when=stamp();
    function each(sel,fn){ [].slice.call(root.querySelectorAll(sel)).forEach(fn); }
    function remove(el){ if(el&&el.parentNode) el.parentNode.removeChild(el); }
    each('script, .lesson-tools, .pager, .top-tools, .foot-note', remove);
    if(lessonId){ each('.lesson',function(l){ if(l.id!==lessonId) remove(l); }); each('.tabs', remove); }
    else { each('.tab',function(t){ t.classList.remove('active'); }); }
    // 메모 입력란 → 입력한 내용(텍스트)
    var live={}; document.querySelectorAll('.memo').forEach(function(t){ live[t.getAttribute('data-key')]=t.value; });
    each('.memo',function(t){
      var v=(live[t.getAttribute('data-key')]||'').trim();
      var d=document.createElement('div'); d.className='memo memo-out'+(v?' filled':' empty'); d.textContent=v||'(메모 없음)';
      t.parentNode.replaceChild(d,t);
    });
    var liveC={}; document.querySelectorAll('input[type=checkbox][data-key]').forEach(function(c){ liveC[c.getAttribute('data-key')]=c.checked; });
    each('input[type=checkbox][data-key]',function(c){ if(liveC[c.getAttribute('data-key')]) c.setAttribute('checked',''); else c.removeAttribute('checked'); c.removeAttribute('data-key'); });
    // 상단 안내 + 제목
    var sec=lessonId?document.getElementById(lessonId):null;
    var lessonLabel=sec?(sec.getAttribute('data-n')+'과 '+sec.querySelector('.lesson-hero h2').textContent.trim()):'전체';
    var label=bookTitle+' '+lessonLabel+' 메모'+(name?' ('+name+')':'');
    var note=document.createElement('div'); note.className='export-note';
    note.innerHTML='<b>📝 메모가 포함된 교재</b><span>'+esc(name?name+' · ':'')+esc(when)+' 저장</span>';
    var main=root.querySelector('main'); main.insertBefore(note,main.firstChild);
    var title=root.querySelector('title'); if(title) title.textContent=label;
    var fname=(bookTitle+'_'+(sec?sec.getAttribute('data-n')+'과':'전체')+'_메모'+(name?'_'+name:'')+'_'+when.slice(0,10)).replace(/[\\\/:*?"<>|\s]+/g,'_')+'.html';
    return { html:'<!doctype html>\n'+root.outerHTML, name:fname, label:label };
  }
  function downloadFile(blob,name){
    var url=URL.createObjectURL(blob); var a=document.createElement('a'); a.href=url; a.download=name; a.rel='noopener';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); },3000);
  }
  function sendExport(lessonId,btn){
    var ex=buildExport(lessonId);
    var blob=new Blob([ex.html],{type:'text/html'});
    var file=null; try{ file=new File([blob],ex.name,{type:'text/html'}); }catch(e){}
    if(file&&navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
      btn.disabled=true;
      navigator.share({files:[file],title:ex.label,text:ex.label+' 파일입니다.'})
        .catch(function(err){ if(!err||err.name!=='AbortError'){ downloadFile(blob,ex.name); alert('공유 창을 열 수 없어 파일로 저장했습니다.\n"'+ex.name+'" 파일을 카카오톡 대화방에서 파일 첨부로 보내 주세요.'); } })
        .then(function(){ btn.disabled=false; });
    } else {
      downloadFile(blob,ex.name);
      alert('이 브라우저에서는 바로 공유할 수 없어 파일로 저장했습니다.\n저장된 "'+ex.name+'" 파일을 카카오톡 대화방에서 파일 첨부로 보내 주세요.');
    }
  }
  document.querySelectorAll('.send-one').forEach(function(b){ b.addEventListener('click',function(){ sendExport(b.getAttribute('data-lesson'),b); }); });
  document.querySelectorAll('.send-all').forEach(function(b){ b.addEventListener('click',function(){ sendExport(null,b); }); });

  window.addEventListener('load',function(){ autosizeAll(); });
  window.addEventListener('resize',function(){ autosizeAll(); });
})();
