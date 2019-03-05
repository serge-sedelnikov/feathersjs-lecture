for /l %%x in (1, 1, 4) do (
   echo %%x
   start cmd /c "node index.js --id=m%%x"
)