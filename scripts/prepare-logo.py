"""Derive transparent logo assets directly from the official artwork.
No shapes are redrawn: pixels are upscaled and their flat grey ground is removed."""
import sys
from PIL import Image
import numpy as np
src, out = sys.argv[1], sys.argv[2]
S=6
im=Image.open(src).convert('RGB'); w,h=im.size
a=np.array(im.resize((w*S,h*S),Image.LANCZOS)).astype(float)
bg=np.array([217,217,217.]); inks=[np.array([17,57,70.]),np.array([188,163,127.])]
best=None
rs=[];ts=[]
for ink in inks:
    v=ink-bg; t=((a-bg)*v).sum(2)/(v*v).sum(); t=np.clip(t,0,1)
    rs.append(np.abs(a-(bg+t[...,None]*v)).sum(2)); ts.append(t)
pick=(rs[0]>rs[1]).astype(int)
t=np.where(pick==1,ts[1],ts[0]); r=np.minimum(rs[0],rs[1])
alpha=np.clip((t-.5)*2.2+.5,0,1)
rgb=np.where(pick[...,None]==1,inks[1],inks[0])
mix=r>40              # teal/sand boundary: keep original colour at full opacity
alpha[mix]=1; rgb[mix]=np.clip(a,0,255)[mix]
res=Image.fromarray(np.dstack([rgb,alpha*255]).round().astype('uint8'),'RGBA')
A=np.array(res)[...,3]>16
rows=A.any(1); ys=np.where(rows)[0]; xs=np.where(A.any(0))[0]
# wordmark gap: first empty row band beneath the symbol
gaps=[y for y in range(ys.min(),ys.max()) if not rows[y]]
gaps=[y for y in gaps if y>ys.min()+(ys.max()-ys.min())*0.6]; gap=gaps[0] if gaps else ys.max()
p=S*2
full=res.crop((xs.min()-p,ys.min()-p,xs.max()+p,ys.max()+p))
sx=np.where(A[:gap].any(0))[0]
sym=res.crop((sx.min()-p,ys.min()-p,sx.max()+p,gap+p//2))
full.save(f'{out}/berkano-logo.png',optimize=True); sym.save(f'{out}/berkano-symbol.png',optimize=True)
print(full.size,sym.size)
