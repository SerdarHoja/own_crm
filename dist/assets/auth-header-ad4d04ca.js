function r(){let e=JSON.parse(localStorage.getItem("user"));return e.token?{Authorization:"Bearer "+e.token}:{}}export{r as a};
