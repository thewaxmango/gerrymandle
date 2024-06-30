from itertools import combinations as co

s = list(str(n) for n in range(0, 6))
combs = list(co(s, 1)) + list(co(s, 2)) + list(co(s, 3)) + list(co(s, 4)) + list(co(s, 5)) + list(co(s, 6)) 

with open("./src/hexBorders.css", "w+") as f:
        
    for comb in combs:
        cbs = "".join(comb)
        da = ""
        
        ct = [0]
        s = True
        for i in range(6):
            if s == (str(i) in comb):
                ct[-1] += 1
            else:
                s = not s
                ct.append(1)
        
        for v in ct:
            da += f" calc(var(--sidelen) * {v})"
        
        if len(comb) == 6:
            f.write(f"svg .cb-{cbs} polygon {{stroke: #444 !important;}}\n")
        else:
            f.write(f"svg .cb-{cbs} polygon {{stroke: #444 !important; stroke-dasharray:{da} !important;}}\n")
    
    f.truncate()