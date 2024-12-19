Dim ShapeWidth As Single, ShapeHeight As Single, ShapeLeft As Single, ShapeTop As Single

Sub CopyShapePosition()
    Dim selectedShapes As PowerPoint.ShapeRange
    Set selectedShapes = ActiveWindow.Selection.ShapeRange

    If selectedShapes.Count > 0 Then
        ShapeLeft = selectedShapes.Left
        ShapeTop = selectedShapes.Top
    End If
End Sub

Sub PasteShapePosition()
    Dim selectedShapes As PowerPoint.ShapeRange
    Set selectedShapes = ActiveWindow.Selection.ShapeRange

    If selectedShapes.Count > 0 Then
        selectedShapes.Left = ShapeLeft
        selectedShapes.Top = ShapeTop
    End If
End Sub

Sub CopyShapeSize()
    Dim selectedShapes As PowerPoint.ShapeRange
    Set selectedShapes = ActiveWindow.Selection.ShapeRange
    
    If selectedShapes.Count > 0 Then
        ShapeWidth = selectedShapes.Width
        ShapeHeight = selectedShapes.Height
    End If
End Sub

Sub PasteShapeSize()
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