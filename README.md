reactNativeMazeSimpleGame

maze jest jako 5x10 kratek zaczyna sie w lewyn dolnym i konczy w lewym gornym i teraz tak, jak ktos chce zmienic pozycje startową to ma state: setsumaX setsumaY. x ustawia w poziomie gdzie chcesz, y w pionie
jak ktos chce zmienic pozycje koncową to ustawia sobie kolor pola w tempArr na "yellow" oraz zmienia ID kwardratu w tym miejscu :
      if(currentBox.key==0){
        _toggle();
        Alert.alert(
          "koniec",
          "elo",
          [ ],
        )
      }
z 0 na jakikolwiek bedzie chcial 0 to lewy gorny kwadracik

aby zmienic sciezke tego to jest tempArr w useEffect i tam sobie mozna wyklikac obojetne jaki ksztalt

jezeli komuś odwraca w osi x ( przechyli telefon w prawo a jajo leci w lewo) to zmienia w setsumaX z - na +:
        setSumaX(sumaX -= currX);
        setSumaY(sumaY += currY);
w dokumentacji bylo napisane ze powinien być + ale w moim siaomi dzialo odwrotnie wiec zmienilem
