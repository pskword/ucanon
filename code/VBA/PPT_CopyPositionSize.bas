Dim ShapeWidth As Single, ShapeHeight As Single, ShapeLeft As Single, ShapeTop As Single

Sub CopyShapePosition()
    ' 선택된 도형의 위치(왼쪽, 위쪽)를 복사하여 전역 변수에 저장합니다.
    Dim selectedShapes As PowerPoint.ShapeRange
    Set selectedShapes = ActiveWindow.Selection.ShapeRange

    If selectedShapes.Count > 0 Then
        ShapeLeft = selectedShapes.Left
        ShapeTop = selectedShapes.Top
    End If
End Sub

Sub PasteShapePosition()
    ' 전역 변수에 저장된 위치를 선택된 도형에 붙여넣습니다.
    Dim selectedShapes As PowerPoint.ShapeRange
    Set selectedShapes = ActiveWindow.Selection.ShapeRange

    If selectedShapes.Count > 0 Then
        selectedShapes.Left = ShapeLeft
        selectedShapes.Top = ShapeTop
    End If
End Sub

Sub CopyShapeSize()
    ' 선택된 도형의 크기(너비, 높이)를 복사하여 전역 변수에 저장합니다.
    Dim selectedShapes As PowerPoint.ShapeRange
    Set selectedShapes = ActiveWindow.Selection.ShapeRange
    
    If selectedShapes.Count > 0 Then
        ShapeWidth = selectedShapes.Width
        ShapeHeight = selectedShapes.Height
    End If
End Sub

Sub PasteShapeSize()
    ' 전역 변수에 저장된 크기를 선택된 도형에 붙여넣습니다.
    Dim selectedShapes As PowerPoint.ShapeRange
    Dim shape As Shape
    Set selectedShapes = ActiveWindow.Selection.ShapeRange
    
    If selectedShapes.Count > 0 Then
        For Each shape In selectedShapes
            shape.LockAspectRatio = msoFalse  ' 종횡비 잠금 해제
            shape.Width = ShapeWidth
            shape.Height = ShapeHeight
            shape.LockAspectRatio = msoTrue   ' 종횡비 잠금 복원 (선택사항)
        Next shape
    End If
End Sub